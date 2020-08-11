const connection = require('../helpers/mysql')
const {auth} = require('../helpers/query')

module.exports = {
    register: (setData) => {
        return new Promise((resolve, reject) => {
            connection.query(auth.register, setData, (error, result) => {
                if (error) {
                    reject(error)
                }
                const newData = {
                    id: result.insertId,
                    ...setData
                }
                delete newData.password
                resolve(newData)
            })
        })
    },
    insertOtp: (setData) => {
        return new Promise((resolve, reject) => {
            connection.query(auth.inserOtp, setData, (error, result) => {
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
    getOtp: (setData) => {
        return new Promise((resolve, reject) => {
            connection.query(auth.getOtp, setData.email, (error, result) => {
                if (error) {
                    reject(error)
                }
                resolve(result)
            })
        })
    },
    deleteOtp: (email) => {
        return new Promise((resolve, reject) => {
            connection.query(auth.deleteOtp, email, (error, result) => {
                if (error) {
                    reject(error)
                }
                resolve(result)
            })
        })
    },
    loginByEmail: (email) => {
        return new Promise((resolve, reject) => {
            connection.query(auth.loginByEmail, email, (error, result) => {
                if (error) {
                    reject(error)
                }
                resolve(result)
            })
        })
    },
    activingUser: (email) => {
        return new Promise((resolve, reject) => {
            connection.query(auth.activingUser, email, (error, result) => {
                if (error) {
                    reject(error)
                }
                const newData = {
                    email: email
                }
                resolve(newData)
            })
        })
    },
    changePassword: (newPassword, email) => {
        return new Promise((resolve, reject) => {
            connection.query(auth.changePassword, [newPassword, email], (error, result) => {
                if (error) {
                    reject(error)
                }
                const newData = {
                    email: email
                }
                resolve(newData)
            })
        })
    },
    resetPassword : (setData) => {
        return new Promise((resolve, reject) => {
            connection.query(auth.resetPassword, [setData, setData.email], (error, result) => {
                if (error) {
                    reject(error)
                }
                const newData = {
                    ...setData
                }
                delete newData.password
                resolve(newData)
            })
        })
    }
}