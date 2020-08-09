// Query for MySQL
module.exports = {
  product: {
    get: '',
    singleProduct: "SELECT products.id, products.name, brands.name as brand, categories.name as category, products.description, products.image, products.price, products.color, products.size, products.rating, products.created_at, products.updated_at FROM products INNER JOIN brands ON products.brand_id = brands.id INNER JOIN categories ON products.category_id = categories.id WHERE products.id = ?",
  }
}
