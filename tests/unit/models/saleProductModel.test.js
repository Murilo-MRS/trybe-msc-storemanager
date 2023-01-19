const { expect } = require('chai');
const sinon = require('sinon');
const { saleProductModel } = require('../../../src/models');
const connection  = require('../../../src/models/db/connection');
const { saleProductsById, newSaleProduct, saleProducts } = require('./mocks/saleProduct.model.mock');

describe('Teste da camada SaleProduct - Model', function () {
  
  describe('Listar todas os vendas', function () {
    
    afterEach(function () {
      sinon.restore();
    });

    it('Lista retorna com successo', async function () {
      // Arrange
      sinon.stub(connection, 'execute').resolves([saleProducts]);
      // Act
      const result = await saleProductModel.listSaleWithDate();
      // Assert
      expect(result).to.be.deep.equal(saleProducts)
    });
  });
  
  describe('Lista vendas por saleId', function () {
    
    afterEach(function () {
      sinon.restore();
    });

    it('Produto retorna com successo', async function () {
      // Arrange
      sinon.stub(connection, 'execute').resolves([saleProductsById]);
      // Act
      const result = await saleProductModel.listSaleWithDateById(1);
      // Assert
      expect(result).to.be.deep.equal(saleProductsById);
    });
  });
  
  describe('Cadastra produto', function () {
    
    afterEach(function () {
      sinon.restore();
    });

    it('com successo', async function () {
      // Arrange
      sinon.stub(connection, 'execute').resolves([{ insertId: 2 }]);
      // Act
      const result = await saleProductModel.addNewProductSale(newSaleProduct);
      // Assert
      expect(result).to.equal(2);
    });
  });

  // describe('Atualiza info da venda', function () {
  //   afterEach(function () {
  //     sinon.restore();
  //   });

  //   it('com successo', async function () {
  //     // Arrange
  //     sinon.stub(connection, 'execute').resolves(productUpdated);
  //     // Act
  //     const result = await saleProductModel.updateById(1, { name: "Produto atualizado" });
  //     // Assert
  //     expect(result[0].affectedRows).to.be.deep.equal(1);
  //     expect(result[0].changedRows).to.be.deep.equal(1);
  //   });
  // })

  // describe('Deleta venda por "id"', function () {
  //   afterEach(function () {
  //     sinon.restore();
  //   });

  //   it('com successo', async function () {
  //     // Arrange
  //     sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
  //     // Act
  //     const result = await saleProductModel.deleteById(2);
  //     // Assert
  //     expect(result).to.be.equal(1);
  //   });
  // });
});