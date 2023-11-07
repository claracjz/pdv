const knex = require('../conexao');

const verificarDuplicidadeEmailCpf = async (req, res, next) => {
    try {
        const { email, cpf } = req.body;
        const { id } = req.params;

        let consultaEmail = knex('clientes').where({ email });
        let consultaCpf = knex('clientes').where({ cpf });

        if (id) {
            consultaEmail = consultaEmail.whereNot({ id });
            consultaCpf = consultaCpf.whereNot({ id });
        }

        const emailExiste = await consultaEmail.first();

        if (emailExiste) {
            return res.status(400).json({ mensagem: 'Email já cadastrado' });
        }

        const cpfExiste = await consultaCpf.first();

        if (cpfExiste) {
            return res.status(400).json({ mensagem: 'Cpf já cadastrado' });
        }

        next();

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno no servidor.' });
    }
};

const verificarClientePorId = async (req, res, next) => {
    try {
        let id = req.params.id || req.body.cliente_id || req.query.cliente_id

        if (id) {
            if (isNaN(id)) {
                return res.status(400).json({ mensagem: 'O id informado deve ser um número inteiro positivo.' })
            }

            const clienteExiste = await knex('clientes').where({ id }).first();

            if (!clienteExiste) {
                return res.status(404).json({ mensagem: 'Não há cliente cadastrado com o ID especificado.' });
            }

            req.cliente = clienteExiste;
        }

        next();
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno no servidor.' });
    }
};

module.exports = {
    verificarDuplicidadeEmailCpf,
    verificarClientePorId
}