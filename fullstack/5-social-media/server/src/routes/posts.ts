import {Router} from 'express';
import {Post, User} from '../models';
import {EmptyAuthorizedRequest} from './interfaces';

const router = Router();

// get timeline: All posts for all followings of a user
router.get('/timeline/:userId', async (req, res, next) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    if (!currentUser) {
      return res.status(403).json({success: false, message: 'Invalid request'});
    }

    // This should actually be a single db query, IMHO.
    // Also, this approach is not scalable. What if a person has 10k followers and each of them have 1k+ posts?
    const currentUserPosts = await Post.find({userId: currentUser._id});
    const friendPosts = await Promise.all(currentUser.followings.map((friend) => Post.find({userId: friend._id})));

    const postsArray = currentUserPosts
      .concat(...friendPosts)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    return res.json(postsArray);
  } catch (err) {
    next(err);
  }
});

// get
router.get('/:id', async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post) {
      return res.json(post.View());
    }
    return res.status(404).json({success: false, message: 'Post not found'});
  } catch (err) {
    next(err);
  }
});

// create
router.post('/', async (req, res, next) => {
  try {
    const post = await Post.create(req.body);
    return res.json(post);
  } catch (err) {
    next(err);
  }
});

// update
router.put('/:id', async (req: EmptyAuthorizedRequest, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({success: false, message: 'Post not found'});
    }

    if (post.userId.toString() == req.body.userId) {
      const updatedPost = await Post.findByIdAndUpdate(post.id, req.body);
      return res.json(updatedPost);
    } else {
      return res.status(403).json({success: false, message: 'You can only update your own posts'});
    }
  } catch (err) {
    next(err);
  }
});

// delete
router.delete('/:id', async (req: EmptyAuthorizedRequest, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({success: false, message: 'Post not found'});
    }

    if (post.userId.toString() == req.body.userId) {
      const {deletedCount} = await Post.deleteOne({_id: post._id});
      res.json({success: true, deletedCount});
    } else {
      return res.status(403).json({success: false, message: 'You can only delete your own posts'});
    }
  } catch (err) {
    next(err);
  }
});

// like
router.put('/:id/like', async (req: EmptyAuthorizedRequest, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({success: false, message: 'Post not found'});
    }

    const currentUser = await User.findById(req.body.userId);
    if (!currentUser) {
      return res.status(403).json({success: false, message: 'Invalid request'});
    }

    if (!post.likes.includes(currentUser._id)) {
      await Post.findByIdAndUpdate(post.id, {$push: {likes: currentUser._id}});
      return res.json({success: true});
    } else {
      return res.status(403).json({success: false, message: 'Post already liked by user'});
    }
  } catch (err) {
    next(err);
  }
});

// unlike
router.put('/:id/unlike', async (req: EmptyAuthorizedRequest, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({success: false, message: 'Post not found'});
    }

    const currentUser = await User.findById(req.body.userId);
    if (!currentUser) {
      return res.status(403).json({success: false, message: 'Invalid request'});
    }

    if (post.likes.includes(currentUser._id)) {
      await Post.findByIdAndUpdate(post.id, {$pull: {likes: currentUser._id}});
      return res.json({success: true});
    } else {
      return res.status(403).json({success: false, message: 'Post not liked by user'});
    }
  } catch (err) {
    next(err);
  }
});

export default router;
