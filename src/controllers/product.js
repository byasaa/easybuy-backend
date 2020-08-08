// Min logic for Author route
const helper = require('../helpers/response');
const productModel = require('../models/product');

module.exports = {
  getLatestProduct: async (req, res) => {
    try {
      const result = await productModel.getLatestProductModel();
      return helper.response(res, 'success', result, 200);
    } catch (err) {
      console.log(err);
      return helper.response(res, 'failed', 'Something Error', 500);
    }
  },
  getSingleProduct: async (req, res) => {
    try {
      const id = req.params.id
      const result = await productModel.getSingleProduct(id);
      return helper.response(res, 'succress', result, 200);
    } catch (err) {
      console.log(err);
      return helper.response(res, 'failed', 'Something Error, 500')
    }
  }
}