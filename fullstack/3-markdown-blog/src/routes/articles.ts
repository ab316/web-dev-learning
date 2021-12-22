import {Router} from 'express';

const router = Router();

router.get('/new', (req, res) => {
  res.render('articles/new');
});

router.post('/', (req, res) => {});

export default router;
