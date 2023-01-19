const { expect } = require('chai');
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { saleProductController } = require('../../../src/controllers');
const validateNewSaleProduct = require('../../../src/middlewares/validateNewSaleProduct');
const { saleProductService } = require('../../../src/services');
const { addedSaleProduct, allSaleProducts, saleProductsById } = require('./mocks/saleProduct.controller.mocks');

chai.use(sinonChai);

describe('Testando SalesProducts - Controller', function () {
  
  describe('Listar todos produtos', function () {
    beforeEach(function () {
      sinon.stub(saleProductService, 'getAllSales').resolves({ type: null, message: allSaleProducts });
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
      await saleProductController.getAllSales(req, res);
      // Assert
      expect(res.status).to.have.been.calledOnceWith(200);
      expect(res.json).to.have.been.calledOnceWith(allSaleProducts);
    });
  });
  
  describe('Busca por produto por id', function () {

    afterEach(function () {
      sinon.restore();
    });

    it('inexistente é chamado o status com o código 404', async function () {
      // Arrange
      const res = {};
      const req = {
        params: { id: 8 }
      };
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(saleProductService, 'getAllSalesbyId')
        .resolves({ type: 'SALE_NOT_FOUND', message: 'Sale not found' });
      // Act
      await saleProductController.getAllSalesbyId(req, res);
      // Assert
      expect(res.status).to.have.been.calledOnceWith(404);
      expect(res.json).to.have.been.calledOnceWith({ message: 'Sale not found' });
    });

    it('é chamado o status com o código 200', async function () {
      // Arrange
      const res = {};
      const req = {
        params: { id: 1 }
      };
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(saleProductService, 'getAllSalesbyId').resolves({ type: null, message: saleProductsById });
      // ActBusca por produto por id
      await saleProductController.getAllSalesbyId(req, res);
      // Assert
      expect(res.status).to.have.been.calledOnceWith(200);
      expect(res.json).to.have.been.calledOnceWith(saleProductsById);
    });
  });

  describe('Cadastra nova venda', function () {

    afterEach(function () {
      sinon.restore();
    });

    it(' inválido é chamado o status com o código 422', async function () {
      // Arrange
      const res = {};
      const req = {
        body: [
          {
            productId: 1,
            quantity: -1
          }
        ]
      };
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      
      sinon.stub(saleProductService, 'addSaleProduct')
        .resolves({ type: 'INVALID_VALUE', message: '"quantity" must be greater than or equal to 1' });
      // Act
      await saleProductController.addSaleProduct(req, res);
      // Assert
      expect(res.status).to.have.been.calledOnceWith(422);
      expect(res.json).to.have.been.calledOnceWith({ message: '"quantity" must be greater than or equal to 1' });
    });

    it('com a propriedade "quantity" inexistente é chamado o status com o código 400', async function () {
      // Arrange
      const res = {};
      const req = {
        body: [{ id: 8, productId: 2 }]
      };
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      
      // Act
      await validateNewSaleProduct(req, res);
      // Assert
      expect(res.status).to.have.been.calledOnceWith(400);
      expect(res.json).to.have.been.calledOnceWith({ message: '"quantity" is required' });
    });

    it('com a propriedade "productId" inexistente é chamado o status com o código 400', async function () {
      // Arrange
      const res = {};
      const req = {
        body: [{ quantity: 8, id: 2 }]
      };
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      
      // Act
      await validateNewSaleProduct(req, res);
      // Assert
      expect(res.status).to.have.been.calledOnceWith(400);
      expect(res.json).to.have.been.calledOnceWith({ message: '"productId" is required' });
    });

    it('é chamado o status com o código 201', async function () {
      // Arrange
      const res = {};
      const req = {
        body: [{ quantity: 8, productId: 2 }]
      };
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(saleProductService, 'addSaleProduct').resolves({ type: null, message: addedSaleProduct });
      // Act
      await saleProductController.addSaleProduct(req, res);
      // Assert
      expect(res.status).to.have.been.calledOnceWith(201);
      expect(res.json).to.have.been.calledOnceWith(addedSaleProduct);
    });
  });

  // describe('Atualiza produto', function () {

  //   afterEach(function () {
  //     sinon.restore();
  //   });

  //   it(' inválido é chamado o status com o código 422', async function () {
  //     // Arrange
  //     const res = {};
  //     const req = {
  //       body: { name: 'a' },
  //       params: { id: 1 },
  //     };
      
  //     res.status = sinon.stub().returns(res);
  //     res.json = sinon.stub().returns();
      
  //     sinon.stub(productService, 'updateProductbyId')
  //       .resolves({ type: 'INVALID_VALUE', message: '"name" length must be at least 5 characters long' });
  //     // Act
  //     await productController.updateProductbyId(req, res);
  //     // Assert
  //     expect(res.status).to.have.been.calledOnceWith(422);
  //     expect(res.json).to.have.been.calledOnceWith({ message: '"name" length must be at least 5 characters long' });
  //   });

  //   it('com a propriedade "name "inexistente é chamado o status com o código 400', async function () {
  //     // Arrange
  //     const res = {};
  //     const req = {
  //       body: { id: 8 }
  //     };
      
  //     res.status = sinon.stub().returns(res);
  //     res.json = sinon.stub().returns();
      
  //     // Act
  //     await validateNewProduct(req, res);
  //     // Assert
  //     expect(res.status).to.have.been.calledOnceWith(400);
  //     expect(res.json).to.have.been.calledOnceWith({ message: '"name" is required' });
  //   });

  //   it('com "id" inexistente é chamado o status com o código 404', async function () {
  //     // Arrange
  //     const res = {};
  //     const req = {
  //       params: { id: 3 },
  //       body: { name: "Atualizado" },
  //     };
      
  //     res.status = sinon.stub().returns(res);
  //     res.json = sinon.stub().returns();
      
  //     sinon.stub(productService, 'updateProductbyId')
  //       .resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });
  //     // Act
  //     await productController.updateProductbyId(req, res);
  //     // Assert
  //     expect(res.status).to.have.been.calledOnceWith(404);
  //     expect(res.json).to.have.been.calledOnceWith({ message: 'Product not found' });
  //   });

  //   it('é chamado o status com o código 200', async function () {
  //     // Arrange
  //     const res = {};
  //     const req = {
  //       body: { name: "Atualizado" },
  //       params: { id: 1 },
  //     };
      
  //     res.status = sinon.stub().returns(res);
  //     res.json = sinon.stub().returns();
  //     sinon.stub(productService, 'updateProductbyId').resolves({ type: null, message: updatedProduct });
  //     // Act
  //     await productController.updateProductbyId(req, res);
  //     // Assert
  //     expect(res.status).to.have.been.calledOnceWith(200);
  //     expect(res.json).to.have.been.calledOnceWith(updatedProduct);
  //   });
  // });

  describe('Deletar produto por id', function () {

    afterEach(function () {
      sinon.restore();
    });

    it('inexistente é chamado o status com o código 404', async function () {
      // Arrange
      const res = {};
      const req = {
        params: { id: 8 }
      };
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(saleProductService, 'deleteSale')
        .resolves({ type: 'SALE_NOT_FOUND', message: 'Sale not found' });
      // Act
      await saleProductController.deleteSale(req, res);
      // Assert
      expect(res.status).to.have.been.calledOnceWith(404);
      expect(res.json).to.have.been.calledOnceWith({ message: 'Sale not found' });
    });

    it('é chamado o status com o código 204', async function () {
      // Arrange
      const res = {};
      const req = {
        params: { id: 1 }
      };
      
      res.status = sinon.stub().returns(res);
      res.end = sinon.stub().returns();
      sinon.stub(saleProductService, 'deleteSale').resolves({ type: null });
      // ActBusca por produto por id
      await saleProductController.deleteSale(req, res);
      // Assert
      expect(res.status).to.have.been.calledOnceWith(204);
    });
  });
});