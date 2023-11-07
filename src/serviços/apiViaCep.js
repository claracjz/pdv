const axios = require('axios');

const complementarEnderecoViaCep = async (cep, dadosCliente) => {
    try {
        const obterEnderecoViaCep = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        const endereco = obterEnderecoViaCep.data;

        const { logradouro, bairro, localidade, uf } = endereco;

        const enderecoFormatado = {
            cep,
            rua: logradouro,
            numero: null,
            bairro,
            cidade: localidade,
            estado: uf
        };

        for (const campo of ['rua', 'bairro', 'cidade', 'estado']) {
            if (dadosCliente[campo] === undefined) {
                dadosCliente[campo] = enderecoFormatado[campo];
            }
        }

        return dadosCliente;

    } catch (error) {
        return {
            erro: 'Erro ao obter endereço via "API Via CEP".',
            detalhes: error.message
        }
    }
}

module.exports = {
    complementarEnderecoViaCep
}