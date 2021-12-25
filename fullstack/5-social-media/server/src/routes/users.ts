import express, {Router} from 'express';
import bcrypt from 'bcrypt';
import {User} from '../models';

const router = Router();

// type RequestWithoutParams<P> = Omit<express.Request, 'params'> & {params: P};

// https://javascript.plainenglish.io/typed-express-request-and-response-with-typescript-7277aea028c
interface TypedRequest<B> extends express.Request {
  body: B;
}

interface AuthorizedRequest<B> extends TypedRequest<B> {
  // Not Used. Concept only
  user?: {
    isAdmin: boolean;
  };
}

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
router.put('/:id', async (req: AuthorizedRequest<{userId: string; password: string}>, res, next) => {
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
router.delete('/:id', async (req: AuthorizedRequest<{userId: string}>, res, next) => {
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
// unfollow

export default router;
