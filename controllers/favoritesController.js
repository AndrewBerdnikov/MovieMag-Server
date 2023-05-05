const Favorites = require('../models/Favorites');
const ApiError = require('../error/ApiError');

class FavoritesController {
    async postFavorite(req, res, next) {
        try {
            const {userId, movieId} = req.body;
            if(!userId || !movieId) {
                return next(ApiError.badRequest("Id пользователся или Id фильма не найдены"));
            }

            let favoritesPost = new Favorites(userId, movieId);

            let favoritesPostCheck = await Favorites.getOneFavorites(userId, movieId);
            if(favoritesPostCheck[0].length > 0) {
                return next(ApiError.badRequest("Фильм уже есть в избранном"));
            }

            favoritesPost = await favoritesPost.createFavorites();

            return res.json({message: "Фильм добален в избранное"});
        } catch(err) {
            console.log(err);
            next(ApiError.badRequest("Что то пошло не так"));
        }
    }

    async getFavorites(req, res, next) {
        try {
            const {userId} = req.body;

            let favorites = await Favorites.getAllFavorites(userId);
            if(favorites[0].length == 0) {
                return next(ApiError.badRequest("Избранные не найдены"));
            }

            return res.json(favorites[0]);
        } catch(err) {
            console.log(err);
            next(ApiError.badRequest("Что то пошло не так"));
        }
    }

    async deleteFavorites(req, res, next) {
        try {
            const {userId, movieId} = req.body;
            if(!userId || !movieId) {
                return next(ApiError.badRequest("Не указан Id фильма или Id пользователя"));
            }

            let favoritesPostCheck = await Favorites.getOneFavorites(userId, movieId);
            if(favoritesPostCheck[0].length > 0) {
                return next(ApiError.badRequest("Фильма нет в избранном"));
            }

            const [movie, _] = await Favorites.deleteFavorites(userId, movieId);

            return res.json({message: "Фильм удален из избранного"});
        } catch (err) {
            console.log(err);
            next(ApiError.badRequest("Что то пошло не так"));
        }
    }
}

module.exports = new FavoritesController();