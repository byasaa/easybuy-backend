// Query for MySQL
module.exports = {
  product: {
    latestProduct: "SELECT * FROM products",
    singleProduct: "SELECT * FROM products WHERE id=?"
  }
}