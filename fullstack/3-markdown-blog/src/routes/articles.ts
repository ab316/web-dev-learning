import express, {Router} from 'express';
import {HydratedDocument} from 'mongoose';
import Article, {IArticle} from '../models/article';
// import {Error, Error as MongooseError} from 'mongoose';

interface TypedRequest<T> extends express.Request {
  body: T;
}

interface UpdateArticleRequest
  extends TypedRequest<HydratedDocument<IArticle>> {
  article?: HydratedDocument<IArticle>;
}

const router = Router();

router.get('/new', (req, res) => {
  res.render('articles/new', {article: new Article()});
});

router.get('/:slug', async (req, res) => {
  try {
    const article = await Article.find({slug: req.params.slug});
    if (article.length > 0) {
      res.render('articles/show', {article: article[0]});
    } else {
      res.redirect('/');
    }
  } catch (e) {
    res.redirect('/');
  }
});

router.get('/edit/:id', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (article) {
      res.render('articles/edit', {article});
    } else {
      res.redirect('/');
    }
  } catch (err) {
    res.redirect('/');
  }
});

router.post(
  '/new',
  async (
    req: UpdateArticleRequest,
    _: express.Response,
    next: express.NextFunction,
  ) => {
    req.article = new Article();
    next();
  },
  saveArticleAndRedirect('articles/new'),
);

router.put(
  '/:id',
  async (
    req: UpdateArticleRequest,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    req.article = (await Article.findById(req.params.id)) ?? undefined;
    next();
  },
  saveArticleAndRedirect('articles/edit'),
);

router.delete('/:id', async (req, res) => {
  await Article.findByIdAndDelete(req.params.id);
  console.log(`Deleted article ${req.params.id}`);
  res.redirect('/');
});

function saveArticleAndRedirect(failView: string) {
  return async (req: UpdateArticleRequest, res: express.Response) => {
    const article = req.article;
    if (!article) {
      console.log('No article present in request object');
      res.redirect('/');
      return;
    }

    article.title = req.body.title;
    article.description = req.body.description;
    article.markdown = req.body.markdown;

    try {
      const savedArticle = await article.save();
      res.redirect(`${savedArticle.slug}`);
    } catch (e: unknown) {
      console.error('Failed to save article', e);
      res.render(failView, {article});
    }
  };
}

// function respondError(e, res) {
//   if (e instanceof MongooseError.ValidationError) {
//     res.status(400).send(e.message);
//   } else if (e instanceof MongooseError) {
//     res.status(500).send(e.message);
//   } else if (e instanceof Error) {
//     res.status(500).send(e.message);
//   }
// }

export default router;
