import {Schema, model} from 'mongoose';
import slugify from 'slugify';
import sanitizeHtml from 'sanitize-html';
import {marked} from 'marked';

export interface IArticle {
  title: string;
  description?: string;
  markdown: string;
  createdAt: Date;
  slug: string;
  sanitizedHtml: string;
}

const articleSchema = new Schema<IArticle>({
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
  sanitizedHtml: {
    type: String,
    required: true,
  },
});

// Create the slug automatically before schema validation of the item being saved
// The async is required for mongoose middleware functionality to work correctly
articleSchema.pre('validate', async function () {
  if (this.title) {
    this.slug = slugify(this.title, {lower: true, strict: true});
  }

  if (this.markdown) {
    this.sanitizedHtml = sanitizeHtml(marked(this.markdown));
  }
});

export default model<IArticle>('Article', articleSchema);
