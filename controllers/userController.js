

const User = require('../models/userModel')

const createUser = async (req, res) => {
    const user = await User.findOne(req.body)
    if (!user) {
        const user = await User.create(req.body)

        return res.json({
            username: user.username,
            _id: user._id
        })    
    } else {
        return res.json({
            username: user.username,
            _id: user._id
        })
    }
}

const getAllUsers = async (req, res) => {
    const users = await User.find({})
    if (!users) {
        return res.json('no users exists')
    }

    res.send(users)


}

module.exports = {
    createUser,
    getAllUsers
}