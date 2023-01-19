const { expect } = require('chai');
const sinon = require('sinon');
const { productModel } = require('../../../src/models');
const connection  = require('../../../src/models/db/connection');
const { allProducts, newProduct, productUpdated } = require('./mocks/product.model.mock');