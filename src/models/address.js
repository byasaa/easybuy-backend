const connection = require('../helpers/mysql')
const {address} = require('../helpers/query')

module.exports = {
    addNewAddress: (setData) => {
        return new Promise((resolve, reject) => {
            connection.query(address.addNewAddress, setData, (error, result) => {
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
    editAddress: (setData, id) => {
        return new Promise((resolve, reject) => {
            connection.query(address.editAddress, [setData, id], (error, result) => {
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
    getAddressById: (id) => {
        return new Promise((resolve, reject) => {
            connection.query(address.getAddressByUserId, id, (error, result) => {
                if (error) {
                    reject(error)
                }
                resolve(result)
            })
        })
    },
}