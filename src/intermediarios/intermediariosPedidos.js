const knex = require('../conexao');

const validarPedido = async (req, res, next) => {
    try {
        const { pedido_produtos } = req.body;

        for (const produto of pedido_produtos) {
            const { produto_id, quantidade_produto } = produto;

            const produtoExiste = await knex('produtos').where('id', produto_id).first();

            if (!produtoExiste) {
                return res.status(400).json({ mensagem: 'Não há produto cadastrado com o ID especificado.' })
            }

            if (produtoExiste.quantidade_estoque < quantidade_produto) {
                return res.status(400).json({ mensagem: 'Quantidade em estoque insuficiente.' })
            }
        }

        next();
    } catch (erro) {
        return res.status(500).json({ mensagem: 'Erro interno no servidor.' });
    }
};

module.exports = {
    validarPedido
}