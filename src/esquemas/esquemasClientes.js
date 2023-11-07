const joi = require('joi');

const esquemaCliente = joi.object({
    nome: joi.string().required().max(150).messages({
        'any.required': 'O campo nome é obrigatório.',
        'string.base': 'O campo nome precisa conter apenas letras.',
        'string.empty': 'O campo nome é obrigatório.',
        'string.max': 'O campo nome precisa conter no máximo 150 caracteres.',
    }),

    email: joi.string().required().email().messages({
        'any.required': 'O campo email é obrigatório.',
        'string.base': 'O campo email precisa ter um formato válido.',
        'string.email': 'O campo email precisa ter um formato válido.',
        'string.empty': 'O campo email é obrigatório.',
    }),

    cpf: joi.string().required().length(11).pattern(/^\d{11}$/).messages({
        'any.required': 'O campo cpf é obrigatório.',
        'string.base': 'O cpf precisa ter um formato válido.',
        'string.empty': 'O campo cpf é obrigatório.',
        'string.length': 'O cpf precisa conter exatamente 11 caracteres.',
        'string.pattern.base': 'O campo cpf deve conter apenas números.',
    }),

    cep: joi.string().length(8).pattern(/^\d{8}$/).messages({
        'string.base': 'O campo cep precisa ter um formato válido.',
        'string.length': 'O cep precisa conter exatamente 8 caracteres.',
        'string.pattern.base': 'O cep deve conter apenas números.',
    }),

    rua: joi.string().max(150).messages({
        'string.base': 'O campo rua precisa ter um formato válido.',
        'string.max': 'O campo rua precisa ter no máximo 150 caracteres.'
    }),

    numero: joi.string().max(150).messages({
        'string.base': 'O campo número precisa ter um formato válido.',
        'string.max': 'O campo número precisa ter no máximo 150 caracteres.'
    }),

    bairro: joi.string().max(150).messages({
        'string.base': 'O campo bairro precisa ter um formato válido.',
        'string.max': 'O campo bairro precisa ter no máximo 150 caracteres.'
    }),

    cidade: joi.string().max(150).messages({
        'string.base': 'O campo cidade precisa ter um formato válido.',
        'string.max': 'O campo cidade precisa ter no máximo 150 caracteres.'
    }),

    estado: joi.string().max(2).messages({
        'string.base': 'O campo estado precisa ter um formato válido.',
        'string.max': 'O campo estado precisa ter no máximo 2 caracteres. Digite apenas a UF.'
    }),

});

module.exports = {
    esquemaCliente
}