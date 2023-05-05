const Movie = require('../models/Movie');
const ApiError = require('../error/ApiError');
const uuid = require('uuid');
const path = require('path');

class MovieController {
    async postMovie(req, res, next) {
        try {
            let { name, generated, director, description } = req.body;
            let {logo} = req.files;
            let fileName = uuid.v4() + ".jpg";
            logo.mv(path.resolve(__dirname, '..', 'static', fileName));
            let movie = new Movie({name, generated, director, description});

            movie = await movie.save();

            res.status(201).json({message: "Добавили фильм"})
        } catch (error) {
            console.log(error);
            next(ApiError.badRequest("Ошибка в добавлении фильма"));
        }
    }

    async getAllMovie(req, res, next) {
        try {
            let [movie, _] = await Movie.findAll();

            res.status(200).json(movie);
        } catch (error) {
            console.log(error);
            next(ApiError.badRequest("Ошибка в получении фильмов"));
        }
    }

    async getRandomMovie(req, res, next) {
        try {
            let [movie, _] = await Movie.findAll();
            let randomNumber = Math.floor(Math.random() * movie.length);
            movie = movie[randomNumber];

            res.status(200).json(movie)
        } catch (error) {
            console.log(error);
            next(ApiError.badRequest("Ошибка в получении случайного фильма"));
        }
    }

    async getMovie(req, res, next) {
        try {
            let movieName = req.params.name;
            let [movie, _] = await Movie.findByName(movieName);

            res.status(200).json(movie);
        } catch (error) {
            console.log(error);
            next(ApiError.badRequest("Ошибка в получении фильма"));
        }
    }

    async deleteMovie(req, res, next) {
        try {
            let movieName = req.params.name;
            let [movie, _] = await Movie.delete(movieName);

            res.status(200).json({message: "Фильм удален"});
        } catch (error) {
            console.log(error);
            next(ApiError.badRequest("Ошибка в удалении"));
        }
    }
}

module.exports = new MovieController();