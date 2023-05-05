const Router = require('express');
const router = new Router();
const favoritesController = require('../controllers/favoritesController');

router.post('/addMovie', favoritesController.postFavorite); //Добавить любимый фильм
router.get('/getMovie', favoritesController.getFavorites); //Получиль любимые фильмы
router.delete('/deleteMovie', favoritesController.deleteFavorites);

module.exports = router;