const Joi = require('joi');

const idSchema = Joi.number().integer().min(1).required();

module.exports = { idSchema };