import {Router} from 'express';
import Article from '../models/article';
// import {Error, Error as MongooseError} from 'mongoose';

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

router.post('/new', async (req, res) => {
  const article = new Article({
    title: req.body.title,
    description: req.body.description,
    markdown: req.body.markdown,
  });
  try {
    const savedArticle = await article.save();
    res.redirect(`${savedArticle.slug}`);
  } catch (e: unknown) {
    console.error('Failed to save article', e);
    res.render('articles/new', {article});
  }
});

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
