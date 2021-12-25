import {Router} from 'express';
import bcrypt from 'bcrypt';

import {AuthorizedRequest} from './interfaces';
import {User} from '../models';

const router = Router();

router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      const {createdAt: _createdAt, updatedAt: _updatedAt, ...other} = user.View();
      res.json(other);
    } else {
      res.sendStatus(404);
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

    const updatedUser = await User.findByIdAndUpdate(req.params.id, {$set: req.body});
    res.json(updatedUser);
  } catch (err) {
    next(err);
  }
});

// delete
router.delete('/:id', async (req: AuthorizedRequest<Record<string, never>>, res, next) => {
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
