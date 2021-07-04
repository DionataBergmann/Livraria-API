const knex = require("../database/dbConfig");

module.exports = {

  async index(req, res) {
    const autores = await knex("autores").orderBy("nome");
    res.status(200).json(autores);
  }
};