const {
    response
} = require('../helpers/response')
const {
    getMyCartList,
    addItem,
    editItem,
    deleteCartItem,
    getSingleCartItem
} = require('../models/cart')
const {
    getSingleProduct
} = require('../models/product')

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
            setData.product_id = req.params.product_id
            const product = await getSingleProduct(setData.product_id)
            if (product[0]) {
                setData.total = parseInt(setData.qty) * product[0].price
                setData.user_id = req.decodedToken.user.id
                console.log(setData);
                const result = await addItem(setData)
                return response(res, 'success', result, 201)
            } else {
                return response(res, 'fail', `Product with id = ${setData.product_id} Not Found`, 404)
            }
        } catch (error) {
            console.log(error)
            return response(res, 'fail', 'Something Wrong I can Feel it', 500)
        }
    },
    editItemCart: async (req, res) => {
        try {
            const id = req.params.id
            const cartItem = await getSingleCartItem(id)
            if (cartItem[0]) {
                const setData = {
                    ...req.body
                }
                setData.product_id = cartItem[0].product_id
                setData.updated_at = new Date()
                const product = await getSingleProduct(setData.product_id)
                if (product[0]) {
                    setData.qty = setData.qty || cartItem[0].qty
                    setData.total = parseInt(setData.qty) * product[0].price
                    const result = await editItem(setData, id)
                    return response(res, 'success', result, 200)
                } else {
                    return response(res, 'fail', `Product with id = ${setData.product_id} Not Found`, 404)
                }
            } else {
                return response(res, 'fail', `Item with id = ${id} Not Found`, 404)
            }
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