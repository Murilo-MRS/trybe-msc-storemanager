module.exports = (req, res, next) => {
  const productList = req.body;
  
  const ids = productList.map((product) => product.productId);
  const quantities = productList.map((product) => product.quantity);

  const idSomeMissing = ids.some((id) => id === undefined);
  const quantitySomeMissing = quantities.some((quantity) => quantity === undefined);

  if (idSomeMissing) return res.status(400).json({ message: '"productId" is required' });
  if (quantitySomeMissing) return res.status(400).json({ message: '"quantity" is required' });

  next();
};