const errorMap = {
  SALE_NOT_FOUND: 404,
  PRODUCT_NOT_FOUND: 404,
  INVALID_VALUE: 422,
};

const mapError = (type) => errorMap[type] || 500;

module.exports = {
  errorMap,
  mapError,
};