const { expect } = require('chai');
const sinon = require('sinon');
const { productModel } = require('../../../src/models');
const connection  = require('../../../src/models/db/connection');
const { allProducts, newProduct, productUpdated } = require('./mocks/product.model.mock');

describe('Teste da camada Product - Model', function () {
  
  describe('Listar todos os produtos', function () {
    
    afterEach(function () {
      sinon.restore();
    });

    it('Lista retorna com successo', async function () {
      // Arrange
      sinon.stub(connection, 'execute').resolves([allProducts]);
      // Act
      const result = await productModel.findAll();
      // Assert
      expect(result).to.be.deep.equal(allProducts)
    });
  });
  
  describe('Lista produto por id', function () {
    
    afterEach(function () {
      sinon.restore();
    });

    it('Produto retorna com successo', async function () {
      // Arrange
      sinon.stub(connection, 'execute').resolves([[allProducts[0]]]);
      // Act
      const result = await productModel.findById(1);
      // Assert
      expect(result).to.be.deep.equal(allProducts[0]);
    });
  });
  
  describe('Cadastra produto', function () {
    
    afterEach(function () {
      sinon.restore();
    });

    it('com successo', async function () {
      // Arrange
      sinon.stub(connection, 'execute').resolves([{ insertId: 3 }]);
      // Act
      const result = await productModel.insert(newProduct);
      // Assert
      expect(result).to.equal(3);
    });
  });

  describe('Atualiza info do produto', function () {
    afterEach(function () {
      sinon.restore();
    });

    it('com successo', async function () {
      // Arrange
      sinon.stub(connection, 'execute').resolves(productUpdated);
      // Act
      const result = await productModel.updateById(1, { name: "Produto atualizado" });
      // Assert
      expect(result[0].affectedRows).to.be.deep.equal(1);
      expect(result[0].changedRows).to.be.deep.equal(1);
    });
  })

  describe('Deleta produto por "id"', function () {
    afterEach(function () {
      sinon.restore();
    });

    it('com successo', async function () {
      // Arrange
      sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
      // Act
      const result = await productModel.deleteById(2);
      // Assert
      expect(result).to.be.equal(1);
    });
  });

  describe('Buscar pelo Product "name"', function () {
    
    afterEach(function () {
      sinon.restore();
    });

    it('retorna com successo', async function () {
      // Arrange
      sinon.stub(connection, 'execute').resolves([allProducts]);
      // Act
      const result = await productModel.findByName('');
      // Assert
      expect(result).to.be.deep.equal(allProducts);
    });
  });
});