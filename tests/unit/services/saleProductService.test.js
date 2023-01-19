const { expect } = require('chai');
const sinon = require('sinon');
const { saleProductModel, saleModel, productModel } = require('../../../src/models');
const { saleProductService } = require('../../../src/services');
const { saleProductsById, productSold, saleProductsService, allSaleProducts } = require('./mocks/saleProduct.service.mock');

describe('Testando SalesProducts - Service', function () {
  
  describe('Lista todos os produtos', function () {
    beforeEach(function () {
      sinon.stub(saleProductModel, 'listSaleWithDate').resolves(allSaleProducts);
    });

    afterEach(function () {
      sinon.restore();
    });
    
    it('com sucesso', async function () {
      // Arrange
      // Act
      const { type, message } = await saleProductService.getAllSales();
      // Assert
      expect(type).to.be.equal(null)
      expect(message).to.be.deep.equal(allSaleProducts)
    });
  });
  
  describe('Lista venda por Id', function () {
            
    afterEach(function () {
      sinon.restore();
    });
    
    it('retorna erro por sale_id inexistente', async function () {
      // Arrange
      sinon.stub(saleProductModel, 'listSaleWithDateById').resolves([]);
      // Act
      const { type, message } = await saleProductService.getAllSalesbyId(8);
      // Assert
      expect(type).to.be.equal('SALE_NOT_FOUND');
      expect(message).to.be.deep.equal('Sale not found');
    });
    
    it('com id existente com sucesso', async function () {
      // Arrange
      sinon.stub(saleProductModel, 'listSaleWithDateById').resolves(saleProductsById);
      // Act
      const { type, message } = await saleProductService.getAllSalesbyId(1);
      // Assert
      expect(type).to.be.equal(null);
      expect(message).to.be.deep.equal(saleProductsById);
    });
  });
  
  describe('Cadastrar nova venda', function () {
            
    afterEach(function () {
      sinon.restore();
    });

    const invalidQuantity = -1;
    const invalidProductId = 3;
    
    it('retorna erro com "quantity" inválido', async function () {
      // Arrange
      // Act
      const { type, message } = await saleProductService.addSaleProduct([{ quantity: invalidQuantity, productId: 2 }]);
      // Assert
      expect(type).to.be.equal('INVALID_VALUE');
      expect(message).to.be.deep.equal('"quantity" must be greater than or equal to 1');
    });
    
    it('retorna erro com "productId" inválido', async function () {
      // Arrange
      sinon.stub(productModel, 'findById').onFirstCall().resolves(undefined);
      // Act
      const { type, message } = await saleProductService.addSaleProduct([{ quantity: 1, productId: invalidProductId }]);
      // Assert
      expect(type).to.be.equal('PRODUCT_NOT_FOUND');
      expect(message).to.be.deep.equal('Product not found');
    });
      
    it('com valores válidos', async function () {
      // Arrange
      sinon.stub(saleModel, 'addNewSale').resolves(3);

      sinon.stub(saleProductModel, 'addNewProductSale')
        .onFirstCall().resolves(1)
        .onSecondCall().resolves(2);
      
      // Act
      const { type, message } = await saleProductService.addSaleProduct(productSold);
      // Assert
      expect(type).to.be.equal(null);
      expect(message).to.be.deep.equal(saleProductsService);
    });
  });

  // describe('Atualizar produto', function () {
            
  //   afterEach(function () {
  //     sinon.restore();
  //   });

  //   it('retorna erro com id inválido', async function () {
  //     // Arrange
  //     // Act
  //     const { type, message } = await productService.updateProductbyId('a', { name:  'Teste' });
  //     // Assert
  //     expect(type).to.be.equal('INVALID_VALUE');
  //     expect(message).to.be.deep.equal('"id" must be a number');
  //   });

  //   it('retorna erro com id de produto inexistente', async function () {
  //     // Arrange
  //     sinon.stub(saleProductModel, 'findById').resolves(undefined);
  //     // Act
  //     const { type, message } = await productService.updateProductbyId(3, { name:  'Teste' });
  //     // Assert
  //     expect(type).to.be.equal('PRODUCT_NOT_FOUND');
  //     expect(message).to.be.deep.equal('Product not found');
  //   });

  //   it('retorna erro com "name" inválido', async function () {
  //     // Arrange
  //     const prodcutId = 3
  //     const product = { id: prodcutId, name: 'Teste 123' };
  //     const invalidNameUpdate =  "Test";

  //     sinon.stub(saleProductModel, 'findById').resolves(product);
  //     // Act
  //     const { type, message } = await productService.updateProductbyId(3, invalidNameUpdate);
  //     // Assert
  //     expect(type).to.be.equal('INVALID_VALUE');
  //     expect(message).to.be.deep.equal('"name" length must be at least 5 characters long');
  //   });
      
  //   it('com valores válidos', async function () {
  //     // Arrange
  //     const prodcutId = 3
  //     const product = { id: prodcutId, name: 'Teste' };
  //     const validNameUpdate = 'Atualizado';
  //     const productUpdated = {id: 3, name: validNameUpdate};

  //     sinon.stub(saleProductModel, 'findById')
  //       .onFirstCall().resolves(product)
  //       .onSecondCall().resolves(productUpdated);
  //     sinon.stub(saleProductModel, 'updateById').resolves(true);
  //     // Act
  //     const { type, message } = await productService.updateProductbyId(3, validNameUpdate);
  //     // Assert
  //     expect(type).to.be.equal(null);
  //     expect(message).to.be.deep.equal(productUpdated);
  //   });
  // });
 
  describe('Deletar produto', function () {
            
    afterEach(function () {
      sinon.restore();
    });

    it('retorna erro com "id" inexistente', async function () {
      // Arrange
      sinon.stub(saleProductModel, 'listSaleWithDateById').resolves([]);
      // Act
      const { type, message } = await saleProductService.deleteSale(4);
      // Assert
      expect(type).to.be.equal('SALE_NOT_FOUND');
      expect(message).to.be.deep.equal('Sale not found');
    });
      
    it('com valores válidos', async function () {
      // Arrange
      const foundSale = [
        {
          "saleId": 1,
          "date": "2021-09-09T04:54:29.000Z",
          "productId": 1,
          "quantity": 2
        }
      ]
      sinon.stub(saleModel, 'deleteFromSales').resolves(1);
      sinon.stub(saleProductModel, 'deleteFromSalesProducts').resolves(1);
      sinon.stub(saleProductModel, 'listSaleWithDateById').resolves(foundSale);
      // Act
      const { type } = await saleProductService.deleteSale(30);
      // Assert
      expect(type).to.be.equal(null);
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});