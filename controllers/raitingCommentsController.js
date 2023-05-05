const RaitingComments = require('../models/RaitingComments');
const ApiError = require('../error/ApiError');

class RaitingCommentsController {
    async postRaiting(req, res, next) {
        try {
            const {userId, movieId, raiting} = req.body;

            if(!userId || !movieId) {
                return next(ApiError.badRequest("Не удалось найти Id пользователя или Id фильма"));
            }

            let [checkRaiting, _] = await RaitingComments.findUserIdForRaiting(userId, movieId);
            if(checkRaiting.length != 0) {
                return next(ApiError.badRequest("Рейтинг уже добавлен"));
            }

            let newRaiting = new RaitingComments(userId, movieId);
            newRaiting = await newRaiting.addRaiting(raiting);

            return res.json({message: "Рейтинг был добавлен"});
        } catch(err) { 
            console.log(err);
            next(ApiError.badRequest("Что то пошло не так"));
        }
    }

    async postComment(req, res, next) {
        try {
            const {userId, movieId, comment} = req.body;

            if (!userId || !movieId) {
                return next(ApiError.badRequest("Не удалось найти Id пользователя или Id фильма"));
            } 

            let [checkComment, _] = await RaitingComments.findUserIdForComment(userId, movieId);
            if(checkComment.length != 0) {
                return next(ApiError.badRequest("Комментарий к фильму уже оставлен"));
            }

            let newComment = new RaitingComments(userId, movieId);
            newComment = await newComment.addComment(comment);
            
            return res.json({message: "Комментарий был добавлен"});
        } catch(err) {
            console.log(err);
            next(ApiError.badRequest("Что то пошло не так"));
        }
    }

    async getRaiting(req, res, next) {
        try {
            const {movieId} = req.body;
            if(!movieId) {
                return next(ApiError.badRequest("Фильма с таким Id не существует"));
            }

            let [allRaiting, _] = await RaitingComments.getRaiting(movieId);

            let countRaiting = 0;
            let raiting = 0;

            for(let i = 0; i < allRaiting.length; i++) {
                if(allRaiting[i].raiting == null) continue;
                raiting += allRaiting[i].raiting;
                countRaiting++;
            }
            raiting = raiting / countRaiting;

            return res.json(raiting);
        } catch(err) {
            console.log(err);
            next(ApiError.badRequest("Что то пошло не так"));
        }
    }

    async getComments(req, res, next) {
        try {
            const {movieId} = req.body;
            if(!movieId) {
                return next(ApiError.badRequest("Фильма с таким Id не существует"));
            }

            let [comments, _] = await RaitingComments.getComments(movieId);
            if(comments.length == 0) {
                return next(ApiError.badRequest("У фильма нет комментариев"));
            }

            return res.json(comments[0]);
        } catch(err) {
            console.log(err);
            next(ApiError.badRequest("Что то пошло не так"));
        }
    }
}

module.exports = new RaitingCommentsController();
