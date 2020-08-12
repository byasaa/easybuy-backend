const {
    response
} = require('../helpers/response')
const {
    editProduct,
    deleteProduct,
    insertProduct,
    getProductModel,
    getSingleProduct
} = require('../models/product')
const redis = require('../middlewares/redis');

module.exports = {
    getProduct: async (req, res) => {
        let {
            sort,
            search,
            color,
            size,
            category,
            limit,
            page
        } = req.query
        let order = sort == 'oldest' ? 'created_at ASC' :
            sort == 'newest' ? 'created_at DESC' :
                sort == 'popular' ? 'rating DESC' :
                    sort == 'price-low' ? 'price ASC' :
                        sort == 'price-high' ? 'price DESC' :
                            'created_at DESC'
        search = search || ''
        color = color || ''
        size = size || ''
        category = category || ''
        limit = parseInt(limit) || 10
        page = parseInt(page) || 1
        try {
            const result = await getProductModel(search, color, size, category, order, limit, page)
            if (result[0]) {
                return response(res, 'success', result, 200)
            }
            return response(res, 'fail', 'Product Null', 404)
        } catch (error) {
            console.log(error)
            return response(res, 'fail', 'Something Wrong I can Feel it', 500)
        }
    },
    addProduct: async (req, res) => {
        try {
            const setData = {
                ...req.body
            }
            if (req.file) {
                setData.image = req.file.filename
            }
            const result = await insertProduct(setData)
            return response(res, 'success', result, 201)
        } catch (error) {
            console.log(error)
            return response(res, 'fail', 'Something Wrong I can Feel it', 500)
        }
    },
    editProduct: async (req, res) => {
        try {
            const setData = {
                ...req.body
            }
            if (req.file) {
                setData.image = req.file.filename
            }
            const id = req.params.id
            setData.updated_at = new Date()
            const result = await editProduct(setData, id)
            const name = "product";
            redis.deleteCache(`${name}` + id)
            return response(res, 'success', result, 200)
        } catch (error) {
            console.log(error)
            return response(res, 'fail', 'Something Wrong I can Feel it', 500)
        }
    },
    deleteProduct: async (req, res) => {
        try {
            const id = req.params.id
            const result = await deleteProduct(id)
            const name = "product";
            redis.deleteCache(`${name}` + id);
            return response(res, 'success', result, 200)
        } catch (error) {
            console.log(error)
            return response(res, 'fail', 'Something Wrong I can Feel it', 500)
        }
    },
    getSingleProduct: async (req, res) => {
        try {
            const {
                id
            } = req.params
            const result = await getSingleProduct(id);
            const entries = Object.entries(result[0]);
            const obj = Object.fromEntries(entries);
            delete obj.created_at
            delete obj.updated_at
            console.log("Hello from main controller")
            const name = 'product';
            redis.caching(name, id, obj)
            return response(res, 'success', obj, 200);
        } catch (err) {
            console.log(err);
            return response(res, 'failed', 'Something Error', 500)
        }
    }
}