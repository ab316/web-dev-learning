import {Schema, model} from 'mongoose';
import marked from 'marked';
import slugify from 'slugify';

interface Article {
  title: string;
  description?: string;
  markdown: string;
  createdAt: Date;
  slug: string;
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
  slug: {
    type: String,
    required: true,
    unique: true,
  },
});

// Create the slug automatically before schema validation of the item being saved
// The async is required for mongoose middleware functionality to work correctly
articleSchema.pre('validate', async function () {
  if (this.title) {
    this.slug = slugify(this.title, {lower: true, strict: true});
  }
});

export default model<Article>('Article', articleSchema);
