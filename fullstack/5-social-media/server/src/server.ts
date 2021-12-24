import express from 'express';
import mongoose from 'mongoose';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

const config = dotenv.config().parsed as dotenv.DotenvParseOutput;

async function setup() {
  const app = express();
  await mongoose.connect(getMongoUrl());
  console.log('Connected to Mongo DB');

  // await User.deleteMany();

  app.use(express.json());
  app.use(helmet());
  app.use(morgan('dev'));

  const errorHandler: express.ErrorRequestHandler = (err, req, res, _next) => {
    console.error(err.stack);
    res.status(500).send('Server Error');
  };
  app.use(errorHandler);

  app.listen(8080, () => {
    console.log(`Server running at port ${config.APP_PORT}`);
  });
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