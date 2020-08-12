const {
    response
} = require('../helpers/response')
const {
    getMyOrder,
    getDetailOrder,
    createOrder,
    createOrderItemFromCart,
    deleteCartAfterSubmit
} = require('../models/order')
const {
    getMyCartList
} = require('../models/cart')
const otpGenerator = require('otp-generator')

module.exports = {
    getMyOrder: async (req, res) => {
        try {
            const id = req.decodedToken.user.id
            const result = await getMyOrder(id)
            return response(res, 'success', result, 200)
        } catch (error) {
            console.log(error)
            return response(res, 'fail', 'Something Wrong I can Feel it', 500)
        }
    },
    getDetailOrder: async (req, res) => {
        try {
            const id = req.params.order_id
            const result = await getDetailOrder(id)
            return response(res, 'success', result, 200)
        } catch (error) {
            console.log(error)
            return response(res, 'fail', 'Something Wrong I can Feel it', 500)
        }
    },
    createOrder: async (req, res) => {
        try {
            let otpCode = otpGenerator.generate(8, {
                upperCase: false,
                specialChars: false,
                alphabets: false
            });
            const user_id = req.decodedToken.user.id
            let temp = []
            let detailSetData = []
            const myChart = await getMyCartList(user_id)
            if (myChart[0]) {
                let amount = 0
                console.log(myChart);
                myChart.map((item) => {
                    amount += item.total
                })
                const setData = {
                    address_id: req.body.address_id,
                    payment_id: req.body.payment_id,
                    user_id: user_id,
                    tracking_number: `T3${otpCode}`,
                    status: 'process',
                    qty: myChart.length,
                    amount: amount
                }
                const orderResult = await createOrder(setData)
                myChart.map((item) => {
                    temp = [orderResult.id, item.product_id, item.color, item.size, item.qty, item.total]
                    detailSetData.push(temp)
                })
                const result = await createOrderItemFromCart(detailSetData)
                await deleteCartAfterSubmit(user_id)
                return response(res, 'success', result, 200)
            } else {
                return response(res, 'fail', 'Your Chart is Empty', 404)
            }
        } catch (error) {
            console.log(error);
            return response(res, 'fail', 'internal server error', 200)
        }
    },
}