const { response } = require('../helpers/response')
const { editProfile, getProfileById } = require('../models/profile')

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
            return response(res, 'success', result, 200)
        } catch (error) {
            console.log(error)
            return response(res, 'fail', 'Something Wrong I can Feel it', 500)
        }
    }
}