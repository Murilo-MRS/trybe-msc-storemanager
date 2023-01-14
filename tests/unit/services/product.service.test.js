const { expect } = require('chai');
const sinon = require('sinon');
const { productModel } = require('../../../src/models');
const { productService } = require('../../../src/services');
const { allProducts } = require('../models/mocks/product.model.mock');


describe('Testando Product - Service', function () {
  
  describe('Testando Product - Service', function () {
    beforeEach(function () {
      sinon.stub(productModel, 'findAll').resolves(allProducts);
    });

    afterEach(function () {
      sinon.restore();
    });
    
    it('Lista todos os produtos', async function () {
      // Arrange
      // Act
      const {type, message} = await productService.getProducts();
      // Assert
      expect(type).to.be.equal(null)
      expect(message).to.be.deep.equal(allProducts)
    });
  })
})