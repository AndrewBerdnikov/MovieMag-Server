const Router = require('express');
const router = new Router();
const movieController = require('../controllers/movieController');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/', movieController.postMovie); //Запостить фильм в базу данных
router.get('/', movieController.getAllMovie); //Получить все фильмы
router.get('/random', movieController.getRandomMovie); //Получение случайного фильма
router.get('/:name', movieController.getMovie); //Получить фильм по названию из базы данных
router.delete('/:name', checkRole('ADMIN'), movieController.deleteMovie); //Удаление фильма по названию

module.exports = router;