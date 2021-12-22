import express from 'express';
import articleRouter from './routes/articles';

const PORT = 5000;
const app = express();

const articles = [
  {
    title: 'Test Article 1',
    createdAt: new Date(),
    description: 'Test description',
  },

  {
    title: 'Test Article 2',
    createdAt: new Date(),
    description: 'Test description 2',
  },
];

app.set('view engine', 'ejs');

app.use('/articles', articleRouter);

app.get('/', (req, res) => {
  res.render('articles/index', {articles});
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
