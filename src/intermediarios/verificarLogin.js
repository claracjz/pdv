const knex = require('../conexao');
const jwt = require('jsonwebtoken');

const verificarLogin = async (req, res, next) => {
    try {
        const { authorization: autorizacao } = req.headers;

        if (!autorizacao) {
            return res.status(401).json({ mensagem: 'Acesso não autorizado. Efetue o login.' });
        }

        const token = autorizacao.replace('Bearer ', '').trim();

        const { id } = jwt.verify(token, process.env.JWT_SECRET);

        const usuarioLogado = await knex('usuarios').where({ id }).first();

        if (!usuarioLogado) {
            return res.status(404).json({ mensagem: 'Usuario não encontrado.' });
        }

        const { senha, ...usuario } = usuarioLogado;

        req.usuario = usuario;

        next();

    } catch (error) {
        if (error.message === 'jwt expired') {
            return res.status(498).json({ mensagem: 'Token expirado. Faça login novamente.' });
        }

        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
};

module.exports = {
    verificarLogin
}