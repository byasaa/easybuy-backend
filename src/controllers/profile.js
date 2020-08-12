const { response } = require('../helpers/response')
const { editProfile, getProfileById } = require('../models/profile')
const redis = require('../middlewares/redis');

module.exports = {
    editProfile: async (req, res) => {
        const setData = {
            ...req.body
        }
        if (req.file) {
            setData.image = req.file.filename
        }
        const id = req.params.id
        setData.updated_at = new Date()
        try {
            const result = await editProfile(setData, id)
            const name = "profile";
            redis.deleteCache(`${name}` + id)
            return response(res, 'success', result, 200)
        } catch (error) {
            console.log(error)
            return response(res, 'fail', 'Something Wrong I can Feel it', 500)
        }
    },
    getProfileById: async (req, res) => {
        const id = req.params.id
        try {
            const result = await getProfileById(id)
            const entries = Object.entries(result[0]);
            const obj = Object.fromEntries(entries);
            delete obj.created_at
            delete obj.updated_at
            console.log("Hello from main controller")
            const name = 'profile';
            redis.caching(name, id, obj)
            return response(res, 'success', result, 200)
        } catch (error) {
            console.log(error)
            return response(res, 'fail', 'Something Wrong I can Feel it', 500)
        }
    }
}