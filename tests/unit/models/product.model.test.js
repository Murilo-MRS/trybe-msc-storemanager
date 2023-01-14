const { expect } = require('chai');
const sinon = require('sinon');
const { productModel } = require('../../../src/models');
const connection  = require('../../../src/models/db/connection');
const { allProducts } = require('./mocks/product.model.mock');

describe('Testando Product - Model', function () {
  
  describe('Testando Product - Model', function () {
    
    it('Lista todos os produtos', async function () {
      // Arrange
      sinon.stub(connection, 'execute').resolves([allProducts])
      // Act
      const result = await productModel.findAll();
      // Assert
      expect(result).to.be.deep.equal(allProducts)
    });
    afterEach(function () {
      sinon.restore();
    });
  })
})