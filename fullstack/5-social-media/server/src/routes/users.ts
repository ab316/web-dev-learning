import {Router} from 'express';
import bcrypt from 'bcrypt';

import {AuthorizedRequest, EmptyAuthorizedRequest, TypedQueryRequest} from './interfaces';
import {User} from '../models';

const router = Router();

router.get('/', async (req: TypedQueryRequest<{userId: string; username: string}>, res, next) => {
  try {
    const userId = req.query.userId;
    const username = req.query.username;

    if (!userId && !username) {
      res.status(400).json({message: 'Provide either userId or username query parameter'});
      return;
    }
    const user = userId ? await User.findById(userId) : await User.findOne({username: username});
    if (user) {
      const {createdAt: _createdAt, updatedAt: _updatedAt, ...other} = user.View();
      res.json(other);
    } else {
      res.status(404).json({success: false, message: 'User not found'});
    }
  } catch (err) {
    next(err);
  }
});

router.get('/friends/:userId', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (user) {
      const friends = await Promise.all(user.followings.map((friendId) => User.findById(friendId)));
      const friendList = friends
        .filter((f) => f != null)
        .map((friend) => ({
          username: friend?.username,
          _id: friend?.id,
          profilePicture: friend?.profilePicture,
        }));
      res.json(friendList);
    } else {
      res.status(404).json({success: false, message: 'User not found'});
    }
  } catch (err) {
    next(err);
  }
});

// update
router.put('/:id', async (req: AuthorizedRequest<{password: string}>, res, next) => {
  try {
    const user = await User.findById(req.body.userId);
    if (!user) return res.status(401).json({success: false});

    if (req.body.userId == req.params.id || user.isAdmin) {
      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      }
    } else {
      return res.status(403).json({success: false, message: 'You can only update your own account'});
    }

    await User.findByIdAndUpdate(req.params.id, {$set: req.body});
    res.json({success: true});
  } catch (err) {
    next(err);
  }
});

// delete
router.delete('/:id', async (req: EmptyAuthorizedRequest, res, next) => {
  try {
    const user = await User.findById(req.body.userId);
    if (!user) return res.status(401).json({success: false});

    if (req.body.userId == req.params.id || user.isAdmin) {
      const {deletedCount} = await User.deleteOne({_id: req.params.id});
      res.json({success: true, deletedCount});
    } else {
      return res.status(403).json({success: false, message: 'You can only delete your own account'});
    }
  } catch (err) {
    next(err);
  }
});

// follow
// This should be a transaction
router.put('/:id/follow', async (req: AuthorizedRequest<{password: string}>, res, next) => {
  try {
    if (req.params.id == req.body.userId) {
      return res.status(403).json({success: false, message: 'You can not follow yourself'});
    }
    const user = await User.findById(req.params.id);
    const currentUser = await User.findById(req.body.userId);
    if (!user || !currentUser) {
      return res.status(!currentUser ? 401 : 403).json({success: false, message: 'Invalid request'});
    }

    if (!user.followers.includes(currentUser._id)) {
      await User.findByIdAndUpdate(user._id, {$push: {followers: currentUser._id}});
      await User.findByIdAndUpdate(currentUser._id, {$push: {followings: user._id}});
      return res.send({success: true});
    } else {
      return res.status(403).json({success: false, message: 'Already following'});
    }
  } catch (err) {
    next(err);
  }
});

// unfollow
// This should be a transaction
router.put('/:id/unfollow', async (req: AuthorizedRequest<{password: string}>, res, next) => {
  try {
    if (req.params.id == req.body.userId) {
      return res.status(403).json({success: false, message: 'You can not unfollow yourself'});
    }
    const user = await User.findById(req.params.id);
    const currentUser = await User.findById(req.body.userId);
    if (!user || !currentUser) {
      return res.status(!currentUser ? 401 : 403).json({success: false, message: 'Invalid request'});
    }

    if (user.followers.includes(currentUser._id)) {
      await User.findByIdAndUpdate(user._id, {$pull: {followers: currentUser._id}});
      await User.findByIdAndUpdate(currentUser._id, {$pull: {followings: user._id}});
      return res.send({success: true});
    } else {
      return res.status(403).json({success: false, message: 'Not following'});
    }
  } catch (err) {
    next(err);
  }
});

export default router;
