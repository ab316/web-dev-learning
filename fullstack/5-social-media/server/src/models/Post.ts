import {Schema, model, Types, SchemaTypes} from 'mongoose';
import {ICommonDocument} from './shared';

export interface IPost extends ICommonDocument<IPost> {
  userId: Types.ObjectId;
  desc?: string;
  img: string;
  likes: Types.Array<Types.ObjectId>;
}

const schema = new Schema<IPost>(
  {
    userId: {type: SchemaTypes.ObjectId, required: true, ref: 'User'},
    desc: {type: String, maxlength: 500},
    img: {type: String},
    likes: [{type: SchemaTypes.ObjectId, ref: 'User'}],
  },
  {timestamps: true},
);

schema.methods.View = function (this: IPost) {
  return this._doc;
};

export default model<IPost>('Post', schema);
