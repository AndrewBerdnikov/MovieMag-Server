const db = require('../db');

class Movie {
  constructor({name, logo, generated, director, description}) {
    this.name = name;
    this.logo = logo;
    this.generated = generated;
    this.director = director;
    this.description = description;
  }

  async save() {
    let sql = `INSERT INTO movie (
      name,
      logo,
      director,
      description
    )
    VALUES (
      '${this.name}',
      '${this.logo}'
      '${this.generated}',
      '${this.director}',
      '${this.description}'
    )
    `;

    const [newPost, _] = await db.query(sql);

    return newPost;
  }

  static findAll() {
    let sql = `SELECT * FROM movie`;

    return db.query(sql);
  }

  static findByName(name) {
    let sql = `SELECT * FROM movie WHERE name = '${name}';`;

    return db.query(sql);
  }

  static delete(name) {
    let sql = `DELETE FROM movie WHERE name = '${name}';`;

    return db.query(sql);
  }
}

module.exports = Movie;