import {ObjectId} from 'mongoose';

export interface MongoResult<T> {
  _doc: T;
}

export interface ITimestamps {
  createdAt: Date;
  updatedAt: Date;
}

export interface ICommonDocument<T> extends MongoResult<T>, ITimestamps {
  _id: ObjectId;
  View(): T;
}
