const connection = require('../helpers/mysql')
const {
    order
} = require('../helpers/query')

module.exports = {
    createOrder: (setData) => {
        return new Promise((resolve, reject) => {
            connection.query(order.createOrder, setData, (error, result) => {
                if (error) {
                    reject(error)
                }
                console.log(result)
                const newData = {
                    id: result.insertId,
                    ...setData
                }
                resolve(newData)
            })
        })
    },
    createOrderItemFromCart: (setData) => {
        return new Promise((resolve, reject) => {
            connection.query(order.moveCartToOrder, [setData], (error, result) => {
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
    getMyOrder: (user_id) => {
        return new Promise((resolve, reject) => {
            connection.query(order.getMyOrder, user_id, (error, result) => {
                if (error) {
                    reject(error)
                }
                resolve(result)
            })
        })
    },
    getDetailOrder: (order_id) => {
        return new Promise((resolve, reject) => {
            connection.query(order.getOrderDetail, order_id, (error, result) => {
                if (error) {
                    reject(error)
                }
                resolve(result)
            })
        })
    },
    deleteCartAfterSubmit: (id) => {
        return new Promise((resolve, reject) => {
            connection.query(order.deleteCartAfterSbmit, id, (error, result) => {
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
}