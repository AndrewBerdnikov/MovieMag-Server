const Router = require('express');
const router = new Router();
const genresController = require('../controllers/genresController');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/addGenre', checkRole('ADMIN'), genresController.postGenre) //Добавление жанра
router.get('/getMovie', genresController.getMovie); //Получение фильмов по жанрам
router.get('/getGenre', genresController.getGenres) //Получение жанров


module.exports = router;