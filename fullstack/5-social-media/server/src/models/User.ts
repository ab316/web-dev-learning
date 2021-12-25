import {Schema, model, Types, SchemaTypes} from 'mongoose';
import {ICommonDocument} from './shared';

export interface IUser extends ICommonDocument<IUser> {
  isAdmin: boolean;
  username: string;
  email: string;
  password: string;
  profilePicture: string;
  coverPicture: string;
  followers: Types.Array<Types.ObjectId>;
  followings: Types.Array<Types.ObjectId>;
  about: string;
  city: string;
  from: string;
  relationshipStatus: number;
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
    about: {type: String, maxlength: 50},
    city: {type: String, max: 50},
    from: {type: String, max: 50},
    relationshipStatus: {type: Number, enum: [1, 2, 3]},
  },
  {timestamps: true},
);

schema.methods.View = function (this: IUser) {
  const {password: _pasword, ...others} = this._doc;
  return others;
};

export default model<IUser>('User', schema);
