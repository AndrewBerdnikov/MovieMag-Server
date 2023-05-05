const db = require('../db');

class Genres {
    async addGenre(movieId, genre) {
        let sql = `INSERT INTO genres(
            movie_id,
            genre
        ) VALUES(
            '${movieId}',
            '${genre}'
        )
        `;

        return db.query(sql);
    }

    static getGenre(movieId) {
        let sql = `SELECT DISTINCT genre FROM genres WHERE movie_id = ${movieId};`;

        return db.query(sql);
    }

    static getMovies(genre) {
        let sql = `SELECT DISTINCT movie_id FROM genres WHERE genre = '${genre}'`;

        return db.query(sql);
    }
}

module.exports = Genres;