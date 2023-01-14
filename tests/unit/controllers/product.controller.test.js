const { expect } = require('chai');
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { productController } = require('../../../src/controllers');

const { productService } = require('../../../src/services');
const { allProducts } = require('../models/mocks/product.model.mock');

chai.use(sinonChai);

describe('Testando Product - Controller', function () {
  
  describe('Listar todos produtos', function () {
    beforeEach(function () {
      sinon.stub(productService, 'getProducts').resolves({ type: null, message: allProducts });
    });
    afterEach(function () {
      sinon.restore();
    });
    
    it('é chamado o status com o código 200', async function () {
      // Arrange
      const res = {};
      const req = {};
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      // Act
      await productController.getProducts(req, res);
      // Assert
      expect(res.status).to.have.been.calledOnceWith(200);
    });
  })
})