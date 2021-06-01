const express = require('express')
const routes = express.Router()

const LivroController = require('./controllers/LivroController')
const UsuarioController = require('./controllers/UsuarioController')
const AvaliacaoController = require('./controllers/AvaliacaoController')
const EditLivrosController = require('./controllers/EditLivrosController')
const DestaqueController = require('./controllers/DestaqueController')
const login = require("./middleware/login");

      //Rota para Livros

routes.get("/livros", LivroController.index)
      .get("/destaques", DestaqueController.index)
      .get("/livros/:palavra", LivroController.filter)
      .post("/livros",login, LivroController.store)
      .put("/livros/edit/:id", EditLivrosController.edit);

      //Rota para Destaques

routes.get("/destaques", DestaqueController.index)
      .put("/destaques/:id", DestaqueController.update)

      //Rota para Usuarios

routes.get("/usuarios", UsuarioController.index)
      .post("/usuarios", UsuarioController.store)
      .post("/login", UsuarioController.login);

      //Rota para Comentarios

routes.get("/avaliacao", AvaliacaoController.index)
      .post("/avaliacao", AvaliacaoController.store)
      .put("/avaliacao/:id", AvaliacaoController.edit)
      .delete("/avaliacao/:id", AvaliacaoController.destroy);

module.exports = routes;
