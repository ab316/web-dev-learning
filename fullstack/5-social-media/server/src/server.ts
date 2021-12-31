import express from 'express';
import mongoose from 'mongoose';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import multer from 'multer';
import crypto from 'crypto';
import * as path from 'path';

import {authRoute, usersRoute, postsRoute} from './routes';

const config = dotenv.config().parsed as dotenv.DotenvParseOutput;
const APP_PORT = config.APP_PORT ?? 8080;

async function setup() {
  const app = express();
  await mongoose.connect(getMongoUrl());
  console.log('Connected to Mongo DB');

  app.use(express.json());
  app.use(helmet());
  app.use(morgan('dev'));

  app.use('/images', express.static(path.join(__dirname, '../public/images')));

  const upload = getUploadMiddleware();
  app.post('/api/upload', upload.single('file'), async (req, res, next) => {
    try {
      if (req.file) {
        return res.json({success: true, message: 'File uploaded successfully'});
      } else {
        return res.status(400).json({success: false, message: 'No file provided'});
      }
    } catch (err) {
      next(err);
    }
  });

  app.use('/api/auth', authRoute);
  app.use('/api/users', usersRoute);
  app.use('/api/posts', postsRoute);

  const errorHandler: express.ErrorRequestHandler = (err, req, res, _next) => {
    if (err instanceof SyntaxError || err instanceof mongoose.Error.CastError) {
      return res.status(400).json({
        success: false,
        message: 'Invalid request body format',
        hint: 'Verify that the request URL, body and, query is valid',
      });
    } else if (err instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }
    console.error(err.stack);
    res.status(500).send({success: false, message: 'Server Error'});
  };
  app.use(errorHandler);

  app.listen(APP_PORT, () => {
    console.log(`Server running at port ${APP_PORT}`);
  });
}

function getUploadMiddleware() {
  const storage = multer.diskStorage({
    destination: 'public/images',
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });
  const upload = multer({
    storage: storage,
  });
  return upload;
}

function getMongoUrl() {
  if (!config) {
    throw new Error('MongoDB config missing');
  }
  if (config.MONGODB_URL) {
    return config.MONGODB_URL;
  } else {
    return `${config.MONGODB_PROTOCOL}://${config.MONGODB_USER}:${config.MONGODB_PASS}@${config.MONGODB_SERVER}/${config.MONGODB_DB}?retryWrites=true&w=majority`;
  }
}

setup();
