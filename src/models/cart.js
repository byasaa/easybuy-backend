const connection = require('../helpers/mysql')
const {
    cart
} = require('../helpers/query')

module.exports = {
    addItem: (setData) => {
        return new Promise((resolve, reject) => {
            connection.query(cart.addItemToCart, setData, (error, result) => {
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
    editItem: (setData, id) => {
        return new Promise((resolve, reject) => {
            connection.query(cart.editItemCart, [setData, id], (error, result) => {
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
    getMyCartList: (id) => {
        return new Promise((resolve, reject) => {
            connection.query(cart.getMyCartList, id, (error, result) => {
                if (error) {
                    reject(error)
                }
                resolve(result)
            })
        })
    },
    getSingleCartItem: (id) => {
        return new Promise((resolve, reject) => {
            connection.query(cart.getSingleCartItem, id, (error, result) => {
                if (error) {
                    reject(error)
                }
                resolve(result)
            })
        })
    },
    deleteCartAfterSubmit: (id) => {
        return new Promise((resolve, reject) => {
            connection.query(cart.deleteCartAfterSbmit, id, (error, result) => {
                if (error) {
                    reject(error)
                }
                const newData = {
                    user_id: id
                }
                resolve(newData)
            })
        })
    },
    deleteCartItem: (id) => {
        return new Promise((resolve, reject) => {
            connection.query(cart.deleteItemFromCart, id, (error, result) => {
                if (error) {
                    reject(error)
                }
                const newData = {
                    id: id
                }
                resolve(newData)
            })
        })
    },
}