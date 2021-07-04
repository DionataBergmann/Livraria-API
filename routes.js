const express = require('express')
const routes = express.Router()

const LivroController = require('./controllers/LivroController')
const UsuarioController = require('./controllers/UsuarioController')
const AvaliacaoController = require('./controllers/AvaliacaoController')
const EditLivrosController = require('./controllers/EditLivrosController')
const DestaqueController = require('./controllers/DestaqueController')
const login = require("./middleware/login");
const AutorController = require('./controllers/AutorController')
const DadaosController = require('./controllers/DadaosController')

      //Rota para Livros

routes.get("/autores", AutorController.index);

routes.get("/livros", LivroController.index)
      .get("/livros/destaques", DestaqueController.index)
      .get("/livros/:palavra", LivroController.filter)
      .post("/livros", LivroController.store)
      .put("/livros/edit/:id", EditLivrosController.edit)
      .delete("/livros/:id",LivroController.destroy);

      //Rota para Destaques

routes.get("/livros/destaques", DestaqueController.index)
      .put("/livros/destaque/:id", DestaqueController.update)

      //Rota para Usuarios

routes.get("/usuarios", UsuarioController.index)
      .post("/usuarios", UsuarioController.store)
      .put("/usuarios/:id", UsuarioController.update)
      .delete("/usuarios/:id", UsuarioController.destroy)
      .post("/login", UsuarioController.login);

      //Rota para Comentarios

routes.get("/avaliacao", AvaliacaoController.index)
      .post("/avaliacao", AvaliacaoController.store)
      .put("/avaliacao/:id", AvaliacaoController.edit)
      .delete("/avaliacao/:id", AvaliacaoController.destroy);

      //rota para dados estatisticos
routes.get("/dados",DadaosController.index)
      

module.exports = routes;
