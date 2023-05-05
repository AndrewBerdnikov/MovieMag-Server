const Router = require('express');
const router = new Router();
const raitingCommentsController = require('../controllers/raitingCommentsController');

router.post('/addRaiting', raitingCommentsController.postRaiting); //Запостить рейтинг
router.post('/addComment', raitingCommentsController.postComment); //Запостить коммент
router.get('/getRaiting', raitingCommentsController.getRaiting); //Получить рейтинг
router.get('/getComments', raitingCommentsController.getComments); //Получить комментарии

module.exports = router;