const knex = require('../database/dbconfig');

module.exports = {
    async index(req, res) {
        const dados = await knex.select('preco', knex.raw('AVG(preco)')).from('livros').groupByRaw('preco WITH ROLLUP')
       
        let media = 0;
        let preco_total = 0;
        let maior = 0
        let menor = 1000

        
        for (i = 0; i < dados.length - 1; i++) {
         
            const object = dados[i];
            media = media + Number(Object.values(object)[0]) * Number(Object.values(object)[1]);
            preco_total = preco_total + Number(Object.values(object)[1]);

            if (Number(Object.values(object)[0]) > maior){
                maior = Number(Object.values(object)[0]).toFixed(2)
            }
            if (Number(Object.values(object)[0]) < menor){
                menor = Number(Object.values(object)[0]).toFixed(2)
            }
            console.log(object)
            // console.log(maior)
            // console.log(menor)
            
        }

        media = Math.floor(media / preco_total);
        total_livros = dados.length -1

        res.status(200).json({ ok: 1, msg: `$:${ media.toFixed(2) }`, preco_total , total_livros, maior, menor});
    },

};