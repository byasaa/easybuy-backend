// Database processing for Product
const connection = require('../helpers/mysql');
const {
  product
} = require('../helpers/query');

module.exports = {
  getProductModel: (search, color, size, category, order, limit, page) => {
    let offset = (limit * page) - limit
    return new Promise((resolve, reject) => {
      const find = `%${search}%`
      const colorValue = `%${color}%`
      const sizeValue = `%${size}%`
      const categoryValue = `%${category}%`
      connection.query(`SELECT products.id, products.name, brands.name as brand, categories.name as category, products.description, products.image, products.price, products.color, products.size, products.rating, products.created_at, products.updated_at FROM products INNER JOIN brands ON products.brand_id = brands.id INNER JOIN categories ON products.category_id = categories.id WHERE products.name LIKE ? OR brands.name LIKE ? OR products.description LIKE ? AND products.color RLIKE ? AND products.size RLIKE ? AND categories.name RLIKE ? ORDER BY ${order} LIMIT ? OFFSET ?`, [find, find, find, colorValue, sizeValue, categoryValue, limit, offset], (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      })
    })
  },
  editProduct: (setData, id) => {
    return new Promise((resolve, reject) => {
      connection.query(product.editProduct, [setData, id], (error, result) => {
        if (error) {
          reject(error)
        }
        const newData = {
          ...setData
        }
        resolve(newData)
      })
    })
  },
  insertProduct: (setData, id) => {
    return new Promise((resolve, reject) => {
      connection.query(product.insertProduct, setData, (error, result) => {
        if (error) {
          reject(error)
        }
        const newData = {
          id: result.insertId,
          ...setData
        }
        resolve(newData)
      })
    })
  },
  deleteProduct: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(product.deleteProduct, id, (error, result) => {
        if (error) {
          reject(error)
        }
        const newData = {
          id
        }
        resolve(newData)
      })
    })
  },
  getSingleProduct: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(product.singleProduct, id, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      })
    })
  }
}