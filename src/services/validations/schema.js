const Joi = require('joi');

const idSchema = Joi.number().integer().min(1).required();

const addProductSchema = Joi.object({
  name: Joi.string().min(5).required(),
});

const addSalesProductSchema = Joi.object({
  productId: idSchema.label('productId'),
  quantity: Joi.number().min(1).positive().integer()
    .required()
    .label('quantity'),
})
  .messages({ 'any.min': '{{#label}} must be greater than or equal to {{#limit}}' });

const addListSoldProductSchema = Joi.array().items(addSalesProductSchema);

module.exports = {
  idSchema,
  addProductSchema,
  addSalesProductSchema,
  addListSoldProductSchema,
};