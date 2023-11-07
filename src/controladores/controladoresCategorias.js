const knex = require('../conexao');

const listarCategorias = async (req, res) => {
    try {
        const categoria = await knex('categorias').select('*').orderBy('id');

        return res.status(200).json(categoria);
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
};

module.exports = {
    listarCategorias
}