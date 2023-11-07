const knex = require('../conexao');
const { construirMensagem } = require('../serviços/modeloEmail');
const enviarEmail = require('../serviços/nodemailer');

const cadastrarPedido = async (req, res) => {
    try {
        const { cliente_id, observacao, pedido_produtos } = req.body;

        await knex.transaction(async (trx) => {
            const [pedido_id] = await trx('pedidos').insert({
                cliente_id,
                observacao,
                valor_total: 0
            }).returning('id');

            let valorTotalPedido = 0;
            let produtoExiste;

            for (const produto of pedido_produtos) {
                const { produto_id, quantidade_produto } = produto;

                produtoExiste = await trx('produtos').where('id', produto_id).first();

                await trx('pedido_produtos').insert({
                    pedido_id: pedido_id.id,
                    produto_id,
                    quantidade_produto,
                    valor_produto: produtoExiste.valor
                });

                valorTotalPedido += produtoExiste.valor * quantidade_produto;

                await trx('produtos').where('id', produto_id).decrement('quantidade_estoque', quantidade_produto);
            };

            await trx('pedidos').where('id', pedido_id.id).update({ valor_total: valorTotalPedido });

            const resposta = {
                mensagem: `Pedido de número ${pedido_id.id} cadastrado com sucesso!`,
                valor_pedido: valorTotalPedido,
                produtos: pedido_produtos.map(produto => ({
                    ID_produto: produto.produto_id,
                    quantidade_produto: produto.quantidade_produto,
                    valor_total_produto: produtoExiste.valor * produto.quantidade_produto

                }))
            };

            const emailCliente = await knex('clientes').select('email').where('id', cliente_id).first();

            const mensagemEmail = construirMensagem(pedido_id.id, valorTotalPedido, pedido_produtos, produtoExiste);

            enviarEmail(emailCliente.email, 'Seu pedido foi realizado!', mensagemEmail);

            return res.status(201).json(resposta);
        });
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno no servidor.' })
    }
};

const listarPedidos = async (req, res) => {
    try {
        const { cliente_id } = req.query

        if (cliente_id) {
            const pedidosCliente = await knex('pedidos').where({ cliente_id });
            return res.status(200).json(pedidosCliente);
        } else {
            const pedidos = await knex('pedidos').select('*');
            return res.status(200).json(pedidos);
        }
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ mensagem: 'Erro interno no servidor.' })
    }

};

module.exports = {
    cadastrarPedido,
    listarPedidos
}