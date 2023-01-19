const { expect } = require('chai');
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { productController } = require('../../../src/controllers');
const validateNewProduct = require('../../../src/middlewares/validateNewProduct');

const { productService } = require('../../../src/services');
const { allProducts } = require('../models/mocks/product.model.mock');
const { addedProduct, updatedProduct } = require('./mocks/product.controller.mock');

chai.use(sinonChai);
