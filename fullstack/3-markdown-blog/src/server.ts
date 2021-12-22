import express from 'express';
import mongoose from 'mongoose';
import methodOverride from 'method-override';

import articleRouter from './routes/articles';

import Article from './models/article';

async function setup() {
  if (!process.env.MONGODB_PASS) {
    console.error(
      'Set the env variable MONGODB_PASS to the password of the MongoDB admin user',
    );
    process.exit(1);
  }
  await mongoose.connect(
    `mongodb+srv://admin:${process.env.MONGODB_PASS}@cluster0.pjuci.mongodb.net/markdown-blog`,
  );
  console.log('Connected to mongo db');

  const PORT = 5000;
  const app = express();

  app.set('view engine', 'ejs');
  app.use(express.urlencoded({extended: false}));
  // Allows to use DELETE/PUT/PATCH methods with forms
  app.use(methodOverride('_method'));
  app.use('/articles', articleRouter);

  app.get('/', async (req, res) => {
    const articles = await Article.find().sort({createdAt: 'desc'});
    res.render('articles/index', {articles});
  });

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

setup();
