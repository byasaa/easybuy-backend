const connection = require('../helpers/mysql')

module.exports = {
    register: (setData) => {
        return new Promise((resolve, reject) => {
            connection.query("INSERT INTO users SET ?", setData, (error, result) => {
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
            connection.query("INSERT INTO otp SET ?", setData, (error, result) => {
                if (error) {
                    reject(error)
                }
                resolve(result)
            })
        })
    },
    getOtp: (setData) => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM otp WHERE email = ? ORDER BY created_at DESC LIMIT 1", setData.email, (error, result) => {
                if (error) {
                    reject(error)
                }
                resolve(result)
            })
        })
    },
    loginByEmail: (email) => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM users WHERE email = ?", email, (error, result) => {
                if (error) {
                    reject(error)
                }
                resolve(result)
            })
        })
    },
    activingUser: (email) => {
        return new Promise((resolve, reject) => {
            connection.query("UPDATE users SET is_active = 1 WHERE email = ?", email, (error, result) => {
                if (error) {
                    reject(error)
                }
                const newData = {
                    email: email
                }
                resolve(newData)
            })
        })
    }
}