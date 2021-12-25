import {Router} from 'express';
import mongoose from 'mongoose';
import {MongoError} from 'mongodb';
import bcrypt from 'bcrypt';
import {User} from '../models';

const router = Router();

router.post('/register', async (req, res, next) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    await user.save();
    res.status(200).json(user.View());
  } catch (err) {
    if ((err as MongoError).code == 11000) {
      res.status(400).json({
        success: false,
        message: 'User with given username/email already exists',
      });
    } else if (err instanceof mongoose.Error.ValidationError) {
      res.status(400).json({success: false, message: err.message});
    } else {
      next(err);
    }
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({email: req.body.email});
    if (!user) {
      res.status(401).json({success: false, message: 'Authentication failed'});
      return;
    }

    if (!req.body.password || !(await bcrypt.compare(req.body.password, user.password))) {
      res.status(401).json({success: false, message: 'Authentication failed'});
      return;
    }
    res.json(user.View());
  } catch (err) {
    next(err);
  }
});

export default router;
