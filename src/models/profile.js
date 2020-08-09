const connection = require('../helpers/mysql')
const {profile} = require('../helpers/query')

module.exports = {
    editProfile: (setData, id) => {
        return new Promise((resolve, reject) => {
            connection.query(profile.editProfile, [setData, id], (error, result) => {
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
    },
    getProfileById: (id) => {
        return new Promise((resolve, reject) => {
            connection.query(profile.getProfileById, id, (error, result) => {
                if (error) {
                    reject(error)
                }
                resolve(result)
            })
        })
    },
}