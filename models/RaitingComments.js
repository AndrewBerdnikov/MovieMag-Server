const db = require('../db');

class RaitingComments {
    constructor(userId, movieId) {
        this.userId = userId;
        this.movieId = movieId;
    }

    async addComment(comment) {
        let sql = `INSERT INTO raiting_comments(
           user_id,
           movie_id,
            comment
        ) VALUE (
            '${this.userId}',
            '${this.movieId}',
            '${comment}'
        )
        `;

        return db.query(sql);
    }

    async addRaiting(raiting) {
        let sql = `INSERT INTO raiting_comments(
            user_id,
            movie_id,
             raiting
         ) VALUE (
             '${this.userId}',
             '${this.movieId}',
             '${raiting}'
         )
         `;

        return db.query(sql);
    }

    static getComments(movieId) {
        let sql = `SELECT comment FROM raiting_comments WHERE movie_id = ${movieId};`;

        return db.query(sql);
    }

    static getRaiting(movieId) {
        let sql = `SELECT raiting FROM raiting_comments WHERE movie_id = ${movieId};`;

        return db.query(sql);
    }

    static findUserIdForComment(userId, movieId) {
        let sql = `SELECT comment FROM raiting_comments WHERE user_id = ${userId} AND movie_id = ${movieId};`;

        return db.query(sql);
    }

    static findUserIdForRaiting(userId, movieId) {
        let sql = `SELECT raiting FROM raiting_comments WHERE user_id = ${userId} AND movie_id = ${movieId};`;

        return db.query(sql);
    }
}

module.exports = RaitingComments;