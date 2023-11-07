const joi = require('joi');

const esquemaUsuario = joi.object({
    nome: joi.string().required().max(150).messages({
        'string.base': 'O campo nome precisa conter apenas letras.',
        'string.max': 'O nome precisa conter no máximo 150 caracteres.',
        'any.required': 'O campo nome é obrigatório.',
        'string.empty': 'O campo nome é obrigatório.',
    }),

    email: joi.string().required().email().messages({
        'string.base': 'O campo email precisa ter um formato válido.',
        'string.email': 'O campo email precisa ter um formato válido.',
        'any.required': 'O campo email é obrigatório.',
        'string.empty': 'O campo email é obrigatório.',
    }),

    senha: joi.string().required().messages({
        'string.base': 'A senha precisa ter um formato válido.',
        'any.required': 'O campo senha é obrigatório.',
        'string.empty': 'O campo senha é obrigatório.',
    })
});

const esquemaLoginUsuario = joi.object({
    email: joi.string().required().email().messages({
        'string.base': 'O campo email precisa ter um formato válido.',
        'string.email': 'O campo email precisa ter um formato válido.',
        'any.required': 'O campo email é obrigatório.',
        'string.empty': 'O campo email é obrigatório.',
    }),

    senha: joi.string().required().messages({
        'string.base': 'A senha precisa ter um formato válido.',
        'any.required': 'O campo senha é obrigatório.',
        'string.empty': 'O campo senha é obrigatório.',
    })
});

module.exports = {
    esquemaUsuario,
    esquemaLoginUsuario
}