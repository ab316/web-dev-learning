import {Schema, model} from 'mongoose';

interface Article {
  title: string;
  description?: string;
  markdown: string;
  createdAt: Date;
}

const articleSchema = new Schema<Article>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  markdown: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: () => new Date(),
  },
});

export default model<Article>('Article', articleSchema);
