// Database processing for Product
const connection = require('../helpers/mysql');
const query = require('../helpers/query');

module.exports = {
  getLatestProductModel: () => {
    return new Promise((resolve, reject) => {
      connection.query(query.product.latestProduct, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      })
    })
  },
  // getSingleProduct: (id) => {
  //   return new Promise((resolve, reject) => {
  //     connection.query(query.product.latestProduct, id, (err, result) => {
  //       if (err) {
  //         reject(err);
  //       }
  //       resolve(result);
  //     })
  //   })
  // }
}