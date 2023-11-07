const knex = require('../conexao');

const verificarProdutoPorId = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (isNaN(id) || Number(id) <= 0) {
            return res.status(400).json({ mensagem: 'O id informado deve ser um número inteiro positivo.' })
        }

        const produtoExiste = await knex('produtos').where({ id }).first();

        if (!produtoExiste) {
            return res.status(404).json({ mensagem: 'Não há produto cadastrado com o id especificado.' });
        }

        req.produto = produtoExiste;

        next();

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno no servidor.' });
    }
};

const verificarProdutoEmPedidos = async (req, res, next) => {
    try {
        const { id } = req.params;

        const produtoEmPedidos = await knex('pedido_produtos').where('produto_id', id).first();

        if (produtoEmPedidos) {
            return res.status(400).json({ mensagem: 'O produto está vinculado a um pedido e não pode ser excluído.' });
        }

        next();
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno no servidor.' });
    }
};

module.exports = {
    verificarProdutoPorId,
    verificarProdutoEmPedidos
}