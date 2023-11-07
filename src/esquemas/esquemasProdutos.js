const joi = require('joi');

const esquemaProdutos = joi.object({
    descricao: joi.string().required().max(150).messages({
        'string.base': 'O campo descrição precisa ter um formato válido.',
        'string.max': 'O campo descrição precisa conter no máximo 150 caracteres.',
        'any.required': 'O campo descrição é obrigatório.',
        'string.empty': 'O campo descrição é obrigatório.',
    }),

    quantidade_estoque: joi.number().integer().positive().required().messages({
        'number.base': 'O campo quantidade_estoque precisa ser um número inteiro.',
        'number.positive': 'O campo quantidade_estoque deve ser um número inteiro positivo.',
        'any.required': 'O campo quantidade_estoque é obrigatório.',
        'string.empty': 'O campo quantidade_estoque é obrigatório.',
    }),

    valor: joi.number().required().integer().positive().messages({
        'number.base': 'O campo valor precisa ser um número inteiro positivo.',
        'any.required': 'O campo valor é obrigatório',
        'number.positive': 'O campo valor precisa ser um número inteiro positivo.'
    }),

    categoria_id: joi.number().required().integer().positive().messages({
        'number.base': 'O campo categoria_id precisa ser um número válido.',
        'any.required': 'O campo categoria_id é obrigatório',
        'number.positive': 'O campo categoria_id precisa ser um número inteiro positivo.'
    })
});

module.exports = {
    esquemaProdutos
}
