// Min logic for Author route
const helper = require('../helpers/response');
const productModel = require('../models/product');
const query = require('../helpers/query');
const redis = require('redis');
const REDIS_PORT = 6379;
const client = redis.createClient(REDIS_PORT);

module.exports = {
  getLatestProduct: async (req, res) => {
    try {
      let { sort, page, search, price, size, color, category } = req.query

      const limit = "2"
      const offset = `${page * limit - limit}`
      const pagination = `LIMIT ${limit} OFFSET ${offset}`
      const baseQuery = `SELECT products.id, products.name, brands.name as brand, categories.name as category, products.description, products.image, products.price, products.color, products.size, products.rating, products.created_at, products.updated_at FROM products INNER JOIN brands ON products.brand_id = brands.id INNER JOIN categories ON products.category_id = categories.id`

      // Ternary operator for query params
      // -----------------------------------
      // Oldest product
      // Popular product
      // Featured product
      // Search product
      // Latest product

      sort == 'oldest' ? query.product.get = `${baseQuery} ` + `ORDER BY id ASC ` + pagination
        : sort == 'popular' ? query.product.get = `${baseQuery} ` + `ORDER BY products.rating DESC ` + pagination
          : sort == 'featured' ? query.product.get = `${baseQuery} ` + `ORDER BY RAND() ` + pagination
            : search ? query.product.get = `${baseQuery} ` + `WHERE products.name LIKE '%${search}%' ` + `ORDER BY id DESC ` + pagination
              : price == 'highest' ? query.product.get = `${baseQuery} ` + `ORDER BY products.price DESC ` + pagination
                : price == 'lowest' ? query.product.get = `${baseQuery} ` + `ORDER BY products.price ASC ` + pagination
                  : size ? query.product.get = `${baseQuery} ` + `WHERE products.size = ${size} ` + `ORDER BY id DESC ` + pagination
                    : color ? query.product.get = `${baseQuery} ` + `WHERE products.color = ${color} ` + `ORDER BY id DESC ` + pagination
                      : category ? query.product.get = `${baseQuery} ` + `WHERE products.category_id = ${category} ` + `ORDER BY id DESC ` + pagination
                        : query.product.get = `${baseQuery} ` + `ORDER BY id DESC ` + pagination

      const result = await productModel.getLatestProductModel();
      return helper.response(res, 'success', result, 200);
    } catch (err) {
      console.log(err);
      return helper.response(res, 'failed', 'Something Error', 500);
    }
  },
  getSingleProduct: async (req, res) => {
    try {
      const { id } = req.params
      const result = await productModel.getSingleProduct(id);
      const entries = Object.entries(result[0]);
      const obj = Object.fromEntries(entries);
      delete obj.created_at
      delete obj.updated_at
      console.log("Hello from main controller")
      client.hmset('product' + id, obj);
      return helper.response(res, 'success', obj, 200);
    } catch (err) {
      console.log(err);
      return helper.response(res, 'failed', 'Something Error', 500)
    }
  }
}
