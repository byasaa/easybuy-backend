// Query for MySQL
module.exports = {
  product: {
    get: '',
    singleProduct: "SELECT products.id, products.name, brands.name as brand, categories.name as category, products.description, products.image, products.price, products.color, products.size, products.rating, products.created_at, products.updated_at FROM products INNER JOIN brands ON products.brand_id = brands.id INNER JOIN categories ON products.category_id = categories.id WHERE products.id = ?",
    insertProduct: "INSERT INTO products SET ?",
    editProduct: "UPDATE products SET ? WHERE id = ?",
    deleteProduct: "DELETE FROM products WHERE id = ?"
  },
  auth: {
    register: "INSERT INTO users SET ?",
    loginByEmail: "SELECT * FROM users WHERE email = ?",
    inserOtp: "INSERT INTO otp SET ?",
    getOtp: "SELECT * FROM otp WHERE email = ? ORDER BY created_at DESC LIMIT 1",
    activingUser: "UPDATE users SET is_active = 1 WHERE email = ?",
    deleteOtp: "DELETE FROM otp WHERE email = ?",
    resetPassword: "UPDATE users SET ? WHERE email = ?",
    changePassword: "UPDATE users SET password = ? WHERE email = ?"
  },
  profile: {
    editProfile: "UPDATE users SET ? WHERE id = ?",
    getProfileById: "SELECT id, name, email, image FROM users WHERE id = ?",
  },
  address: {
    addNewAddress: "INSERT INTO address SET ?",
    editAddress: "UPDATE address SET ? WHERE id = ?",
    getAddressByUserId: "SELECT address.id, users.name, address.address, address.created_at, address.updated_at FROM address INNER JOIN users ON address.user_id = users.id WHERE user_id = ?",
    deleteAddress: "",
  },
  cart: {
    getMyCartList: "SELECT cart.id, cart.product_id, products.name, products.image, cart.selected_color as color, cart.selected_size as size, cart.qty, cart.total, cart.created_at, cart.updated_at FROM cart INNER JOIN products ON cart.product_id = products.id WHERE cart.user_id = ?",
    addItemToCart: "INSERT INTO cart SET ?",
    editItemCart: "UPDATE cart SET ? WHERE id = ?",
    deleteItemFromCart: "DELETE FROM cart WHERE id = ?",
  },
  order: {
    getMyOrder: "SELECT id, tracking_number, qty, amount, status, created_at FROM orders WHERE user_id = ? ORDER BY created_at DESC",
    getOrderDetail: "SELECT order_detail.id, products.name, order_detail.selected_color as color, order_detail.selected_size AS size, order_detail.qty, order_detail.total, orders.address_id, order_detail.order_id, orders.tracking_number, orders.status, orders.created_at FROM order_detail INNER JOIN orders ON order_detail.order_id = orders.id INNER JOIN products ON order_detail.product_id = products.id INNER JOIN address ON orders.address_id = address.id WHERE order_id = ?",
    deleteCartAfterSbmit: "DELETE FROM cart WHERE user_id = ?",
    createOrder: "INSERT INTO orders SET ?",
    moveCartToOrder: "INSERT INTO order_detail (order_id, product_id, selected_color, selected_size, qty, total) VALUES ?"
  }
}