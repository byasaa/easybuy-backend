const {response} = require('../helpers/response')
const { addNewAddress, editAddress, getAddressById } = require('../models/address')

module.exports = {
    getAddressById: async (req, res) => {
        const id = req.params.user_id
        try {
            const result = await getAddressById(id)
            return response(res, 'success', result, 200)
        } catch (error) {
            console.log(error)
            return response(res, 'fail', 'Something Wrong I can Feel it', 500)
        }
    },
    addNewAddress: async (req, res) => {
        const setData = {
            ...req.body
        }
        setData.user_id = req.decodedToken.user.id
        try {
            const result = await addNewAddress(setData)
            return response(res, 'success', result, 201)
        } catch (error) {
            console.log(error)
            return response(res, 'fail', 'Something Wrong I can Feel it', 500)
        }
    },
    editAddress: async (req, res) => {
        const setData = {
            ...req.body
        }
        setData.updated_at = new Date()
        const id = req.params.id
        try {
            const result = await editAddress(setData, id)
            return response(res, 'success', result, 200)
        } catch (error) {
            console.log(error)
            return response(res, 'fail', 'Something Wrong I can Feel it', 500)
        }
    },
}