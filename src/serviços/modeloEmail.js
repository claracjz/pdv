module.exports = {
    construirMensagem: (pedido_id, valorTotalPedido, pedido_produtos, produtoExiste) => {
        let mensagem = `Seu pedido com número ${pedido_id} foi realizado com sucesso.\n`;
        mensagem += `Valor Total do Pedido: R$ ${valorTotalPedido}\n`;
        mensagem += `Produto no Pedido: \n`;

        for (const produto of pedido_produtos) {
            mensagem += `ID Produto: ${produto.id} - Quantidade: ${produto.quantidade_produto} - Valor: R$ ${produtoExiste.valor}\n`;
        }
        return mensagem;
    }
}