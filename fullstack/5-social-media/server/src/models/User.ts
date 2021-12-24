import {Schema, model, Types, SchemaTypes} from 'mongoose';
import {ITimestamps} from './shared';

export interface IUser extends ITimestamps {
  isAdmin: boolean;
  username: string;
  email: string;
  password: string;
  profilePicture: string;
  coverPicture: string;
  followers: Types.Array<Types.ObjectId>;
  followings: Types.Array<Types.ObjectId>;
}

const schema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 20,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      maxlength: 20,
      unique: true,
    },
    password: {type: String, required: true, minlength: 6},
    profilePicture: {type: String, default: ''},
    coverPicture: {type: String, default: ''},
    followers: [{type: SchemaTypes.ObjectId, ref: 'User'}],
    followings: [{type: SchemaTypes.ObjectId, ref: 'User'}],
    isAdmin: {type: Boolean, default: false},
  },
  {timestamps: true},
);

export default model<IUser>('User', schema);
