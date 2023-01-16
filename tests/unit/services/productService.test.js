const { expect } = require('chai');
const sinon = require('sinon');
const { productModel } = require('../../../src/models');
const { productService } = require('../../../src/services');
const { allProducts } = require('../models/mocks/product.model.mock');
const { createdProduct, newProduct } = require('./mocks/productService.mock.test');


describe('Testando Product - Service', function () {
  
  describe('Lista todos os produtos', function () {
    beforeEach(function () {
      sinon.stub(productModel, 'findAll').resolves(allProducts);
    });

    afterEach(function () {
      sinon.restore();
    });
    
    it('com sucesso', async function () {
      // Arrange
      // Act
      const { type, message } = await productService.getProducts();
      // Assert
      expect(type).to.be.equal(null)
      expect(message).to.be.deep.equal(allProducts)
    });
  });
  
  describe('Busca por produto', function () {
            
    afterEach(function () {
      sinon.restore();
    });
    
    it('retorna erro com id inválido', async function () {
      // Arrange
      // Act
      const { type, message } = await productService.getProductById('a');
      // Assert
      expect(type).to.be.equal('INVALID_VALUE');
      expect(message).to.be.deep.equal('"id" must be a number');
    });
    
    it('retorna erro por id inexistente', async function () {
      // Arrange
      sinon.stub(productModel, 'findById').resolves(undefined);
      // Act
      const { type, message } = await productService.getProductById(8);
      // Assert
      expect(type).to.be.equal('PRODUCT_NOT_FOUND');
      expect(message).to.be.deep.equal('Product not found');
    });
    
    it('com id existente com sucesso', async function () {
      // Arrange
      sinon.stub(productModel, 'findById').resolves(allProducts[0]);
      // Act
      const { type, message } = await productService.getProductById(1);
      // Assert
      expect(type).to.be.equal(null);
      expect(message).to.be.deep.equal(allProducts[0]);
    });
  })
  describe('Cadastrar novo produto', function () {
            
    afterEach(function () {
      sinon.restore();
    });

    it('retorna erro com name inválido', async function () {
      // Arrange
      // Act
      const { type, message } = await productService.createProduct('a');
      // Assert
      expect(type).to.be.equal('INVALID_VALUE');
      expect(message).to.be.deep.equal('"name" length must be at least 5 characters long');
    });
      
    it('com valores válidos', async function () {
      // Arrange
      sinon.stub(productModel, 'insert').resolves(30);
      sinon.stub(productModel, 'findById').resolves(newProduct);
      // Act
      const { type, message } = await productService.createProduct("ProdutoX");
      // Assert
      expect(type).to.be.equal(null);
      expect(message).to.be.deep.equal(newProduct);
    });
  });
  afterEach(function () {
    sinon.restore();
  });
});