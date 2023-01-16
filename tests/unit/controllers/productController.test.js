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
      expect(res.json).to.have.been.calledOnceWith(allProducts);
    });
  })
  
  describe('Busca por produto por id', function () {

    afterEach(function () {
      sinon.restore();
    });

    it(' inválido é chamado o status com o código 422', async function () {
      // Arrange
      const res = {};
      const req = {
        params: { id: 'a' }
      };
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productService, 'getProductById').resolves({ type: 'INVALID_VALUE', message: '"id" must be a number' });
      // Act
      await productController.getProductById(req, res);
      // Assert
      expect(res.status).to.have.been.calledOnceWith(422);
      expect(res.json).to.have.been.calledOnceWith({ message: '"id" must be a number' });
    });

    it('inexistente é chamado o status com o código 404', async function () {
      // Arrange
      const res = {};
      const req = {
        params: { id: 8 }
      };
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productService, 'getProductById')
        .resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });
      // Act
      await productController.getProductById(req, res);
      // Assert
      expect(res.status).to.have.been.calledOnceWith(404);
      expect(res.json).to.have.been.calledOnceWith({ message: 'Product not found' });
    });

    it('é chamado o status com o código 200', async function () {
      // Arrange
      const res = {};
      const req = {
        params: { id: 1 }
      };
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productService, 'getProductById').resolves({ type: null, message: allProducts[0] });
      // ActBusca por produto por id
      await productController.getProductById(req, res);
      // Assert
      expect(res.status).to.have.been.calledOnceWith(200);
      expect(res.json).to.have.been.calledOnceWith(allProducts[0]);
    });
  });

  describe('Cadastra produto', function () {

    afterEach(function () {
      sinon.restore();
    });

    it(' inválido é chamado o status com o código 422', async function () {
      // Arrange
      const res = {};
      const req = {
        body: { name: 'a' }
      };
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      
      sinon.stub(productService, 'createProduct')
        .resolves({ type: 'INVALID_VALUE', message: '"name" length must be at least 5 characters long' });
      // Act
      await productController.createProduct(req, res);
      // Assert
      expect(res.status).to.have.been.calledOnceWith(422);
      expect(res.json).to.have.been.calledOnceWith({ message: '"name" length must be at least 5 characters long' });
    });

    it('com a propriedade "name "inexistente é chamado o status com o código 400', async function () {
      // Arrange
      const res = {};
      const req = {
        body: { id: 8 }
      };
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      
      // Act
      await validateNewProduct(req, res);
      // Assert
      expect(res.status).to.have.been.calledOnceWith(400);
      expect(res.json).to.have.been.calledOnceWith({ message: '"name" is required' });
    });

    it('é chamado o status com o código 201', async function () {
      // Arrange
      const res = {};
      const req = {
        body: { name: "ProdutoX" }
      };
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productService, 'createProduct').resolves({ type: null, message: addedProduct });
      // Act
      await productController.createProduct(req, res);
      // Assert
      expect(res.status).to.have.been.calledOnceWith(201);
      expect(res.json).to.have.been.calledOnceWith(addedProduct);
    });
  });

  describe('Atualiza produto', function () {

    afterEach(function () {
      sinon.restore();
    });

    it(' inválido é chamado o status com o código 422', async function () {
      // Arrange
      const res = {};
      const req = {
        body: { name: 'a' },
        params: { id: 1 },
      };
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      
      sinon.stub(productService, 'updateProductbyId')
        .resolves({ type: 'INVALID_VALUE', message: '"name" length must be at least 5 characters long' });
      // Act
      await productController.updateProductbyId(req, res);
      // Assert
      expect(res.status).to.have.been.calledOnceWith(422);
      expect(res.json).to.have.been.calledOnceWith({ message: '"name" length must be at least 5 characters long' });
    });

    it('com a propriedade "name "inexistente é chamado o status com o código 400', async function () {
      // Arrange
      const res = {};
      const req = {
        body: { id: 8 }
      };
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      
      // Act
      await validateNewProduct(req, res);
      // Assert
      expect(res.status).to.have.been.calledOnceWith(400);
      expect(res.json).to.have.been.calledOnceWith({ message: '"name" is required' });
    });

    it('com "id" inexistente é chamado o status com o código 404', async function () {
      // Arrange
      const res = {};
      const req = {
        params: { id: 3 },
        body: { name: "Atualizado" },
      };
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      
      sinon.stub(productService, 'updateProductbyId')
        .resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });
      // Act
      await productController.updateProductbyId(req, res);
      // Assert
      expect(res.status).to.have.been.calledOnceWith(404);
      expect(res.json).to.have.been.calledOnceWith({ message: 'Product not found' });
    });

    it('é chamado o status com o código 200', async function () {
      // Arrange
      const res = {};
      const req = {
        body: { name: "Atualizado" },
        params: { id: 1 },
      };
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productService, 'updateProductbyId').resolves({ type: null, message: updatedProduct });
      // Act
      await productController.updateProductbyId(req, res);
      // Assert
      expect(res.status).to.have.been.calledOnceWith(200);
      expect(res.json).to.have.been.calledOnceWith(updatedProduct);
    });
  });
});