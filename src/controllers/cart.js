const {
    response
} = require('../helpers/response')
const {
    getMyCartList,
    addItem,
    editItem,
    deleteCartItem
} = require('../models/cart')

module.exports = {
    getMyCartList: async (req, res) => {
        try {
            const id = req.decodedToken.user.id
            const result = await getMyCartList(id)
            return response(res, 'success', result, 200)
        } catch (error) {
            console.log(error)
            return response(res, 'fail', 'Something Wrong I can Feel it', 500)
        }
    },
    addItemCart: async (req, res) => {
        try {
            const setData = {
                ...req.body
            }
            setData.user_id = req.decodedToken.user.id
            const result = await addItem(setData)
            return response(res, 'success', result, 201)
        } catch (error) {
            console.log(error)
            return response(res, 'fail', 'Something Wrong I can Feel it', 500)
        }
    },
    editItemCart: async (req, res) => {
        try {
            const setData = {
                ...req.body
            }
            setData.updated_at = new Date()
            const id = req.params.id
            const result = await editItem(setData, id)
            return response(res, 'success', result, 200)
        } catch (error) {
            console.log(error)
            return response(res, 'fail', 'Something Wrong I can Feel it', 500)
        }
    },
    deleteItemCart: async (req, res) => {
        try {
            const id = req.params.id
            const result = await deleteCartItem(id)
            return response(res, 'success', result, 200)
        } catch (error) {
            console.log(error)
            return response(res, 'fail', 'Something Wrong I can Feel it', 500)
        }
    },
}