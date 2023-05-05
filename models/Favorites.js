const db = require('../db');

class Favorites {
    constructor(userId, movieId) {
        this.userId = userId;
        this.movieId = movieId;
    }

    async createFavorites() {
        let sql = `INSERT INTO favorites(
            user_id,
            movie_id
        )
        VALUES(
            '${this.userId}',
            '${this.movieId}'
        )
        `;

        const [newFavorites, _] = await db.query(sql);

        return newFavorites;
    }

    static getAllFavorites (userId) {
        let sql = `SELECT * FROM favorites WHERE user_id = ${userId};`;

        return db.query(sql);
    }

    static getOneFavorites(userId, movieId) {
        let sql = `SELECT * FROM favorites WHERE user_id = ${userId} AND movie_id = ${movieId};`;

        return db.query(sql);
    }

    static deleteFavorites(userId, movieId) {
        let sql = `DELETE FROM favorites WHERE user_id = ${userId} AND movie_id = ${movieId};`;

        return db.query(sql);
    }
}

module.exports = Favorites;