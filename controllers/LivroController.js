const knex = require("../database/dbConfig");

module.exports = {
  // index: listagem
  // store/create: inclusão
  // update: alteração
  // show: retornar 1 registro
  // destroy: exclusão

  async index(req, res) {

    const livros = await knex
      .select("l.id", "l.titulo", "a.nome as autor", "l.ano", "l.preco", "l.foto", "l.destaque")
      .from("livros as l")
      .leftJoin("autores as a", "l.autor_id", "a.id")
      .orderBy("l.id", "desc");

    res.status(200).json(livros);
  
  },

  // async show(req, res) {
  //   const id = req.params.id; // ou:  const { id } = req.params

  //   const livro = await knex
  //     .select("l.id", "l.titulo", "l.autor_id", "l.nome as autor", "l.ano", "l.preco", "l.foto", "l.destaque")
  //     .from("livros as l")
  //     .leftJoin("autores as a", "l.autor_id", "a.id")
  //     .where("l.id", id)
  //   res.status(200).json(livro[0]);
  // },

  // async search(req, res) {
  //   const palavra = req.params.palavra; 

  //   const livros = await knex
  //     .select("l.id", "l.titulo", "l.nome as autor", "l.ano", "l.preco", "l.foto", "l.destaque")
  //     .from("livros as l")
  //     .leftJoin("autores as a", "l.autor_id", "a.id")
  //     .where("titulo", "like", "%"+palavra+"%")
  //     .orWhere("a.nome", "like", "%"+palavra+"%")
  //     .orderBy("l.id", "desc");
  //   res.status(200).json(livros);
  // },


  async store(req, res) {
    // faz a desestruturação do objeto req.body
    const { titulo, autor_id, ano, preco, foto } = req.body;

    // validação para os campos
    if (!titulo || !autor_id || !ano || !preco || !foto) {
      res.status(400).json({ erro: "Enviar titulo, autor_id, ano, preco e foto do veículo" });
      return;
    }

    try {
      const novo = await knex("livros").insert({ titulo, autor_id, ano, preco, foto });
      res.status(201).json({ id: novo[0] });
    } catch (error) {
      res.status(400).json({ erro: error.message });
    }
  },

  
  async filter(req, res){
    const palavra = req.params.palavra
      try{
        const dados = await knex('livros')
          .where('titulo', 'like', `%${palavra}%`)
          .orWhere('autor_id', 'like', `%${palavra}%`)
          .orWhere('ano', 'like', `%${palavra}%`)
          .select("l.id", "l.titulo", "a.nome as autores", "l.ano", "l.preco", "l.foto")
          .from("livros as l")
          .leftJoin("autores as a", "l.autor_id", "a.id")
          .orderBy("l.id", "desc");
        res.status(200).json(dados);
      }catch(error){
        res.status(400).json({erro: "Erro na Pesquisa"})
      }
  },

 //testando destaque python


async destroy(req,res){
  const id = req.params.id;

  try {
   await knex("livros").del().where({id})
    res.status(201).json({ok:1,msg:"Livro Deletado"});
  } catch (error) {
    res.status(400).json({ erro: error.message });
      }
    }
  };