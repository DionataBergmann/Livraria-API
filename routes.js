const express = require('express')
const routes = express.Router()

const LivroController = require('./controllers/LivroController')
const UsuarioController = require('./controllers/UsuarioController')
const login = require("./middleware/login");

routes.get("/livros", LivroController.index)
      .post("/livros",login, LivroController.store);

routes.get("/usuarios", UsuarioController.index)
      .post("/usuarios", UsuarioController.store)
      .post("/login", UsuarioController.login);

module.exports = routes;
