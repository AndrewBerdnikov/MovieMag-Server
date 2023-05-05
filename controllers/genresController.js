const ApiError = require('../error/ApiError');
const Genre = require('../models/Genre');

class GenresController {
    async postGenre(req, res, next) {
        try {
            const {movieId, genre} = req.body;
            if(!movieId) {
                return next(ApiError.badRequest("Нет фильма с таким Id"));
            }

            let newGenre = new Genre();
            newGenre = await newGenre.addGenre(movieId, genre);

            return res.json({message: "Жанр добавлен к фильму"});
        } catch(err) {
            console.log(err);
            next(ApiError.badRequest("Что то пошло не так"));
        }
    }

    async getGenres(req, res, next) {
        try {
            const {movieId} = req.body;

            console.log(req.body)

            let [genres, _] = await Genre.getGenre(movieId);
            if(genres == 0) {
                return next(ApiError.badRequest("У фильма пока не добавлены жанры"));
            }

            return res.json(genres);
        } catch(err) {
            console.log(err);
            next(ApiError.badRequest("Что то пошло не так"));
        }
    }

    async getMovie(req, res, next) {
        try {
            let {genre} = req.body;

            let [movies, _] = await Genre.getMovies(genre);

            res.status(200).json(movies);
        } catch (error) {
            console.log(error);
            next(ApiError.badRequest("Что то пошло не так"));
        }
    }
}

module.exports = new GenresController();