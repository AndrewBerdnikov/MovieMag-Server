const Router = require('express');
const router = new Router();
const userRouter = require('./userRouter');
const movieRouter = require('./movieRouter');
const favoritesRouter = require('./favoritesRouter');
const genresRouter = require('./genresRouter');
const raitingCommentsRouter = require('./raitingCommentsRouter');

router.use('/user', userRouter);
router.use('/movie', movieRouter);
router.use('/favorites', favoritesRouter);
router.use('/genres', genresRouter);
router.use('/raiting-comments', raitingCommentsRouter);

module.exports = router;