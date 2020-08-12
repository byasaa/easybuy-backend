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
    getMyCartList: "SELECT cart.id, products.name, products.image, cart.selected_color as color, cart.selected_size as color, cart.qty, cart.created_at, cart.updated_at FROM cart INNER JOIN products ON cart.product_id = products.id WHERE cart.user_id = ?",
    addItemToCart: "INSERT INTO cart SET ?",
    editItemCart: "UPDATE cart SET ? WHERE id = ?",
    deleteItemFromCart: "DELETE FROM cart WHERE id = ?",
    deleteCartAfterSbmit: "DELETE FROM cart WHERE user_id = ?"
  }
}
