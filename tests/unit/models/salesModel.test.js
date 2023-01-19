const { expect } = require('chai');
const sinon = require('sinon');
const { saleModel } = require('../../../src/models');
const connection  = require('../../../src/models/db/connection');
const { newSale } = require('./mocks/sale.model.mock');

describe('Teste da camada Product - Model', function () {
  
  describe('Cadastra venda', function () {
    
    afterEach(function () {
      sinon.restore();
    });

    it('com successo', async function () {
      // Arrange
      sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
      // Act
      const result = await saleModel.addNewSale(newSale);
      // Assert
      expect(result).to.equal(1);
    });
  });
});