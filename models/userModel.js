const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: [true, 'Please provide username'],
    }
})


module.exports = mongoose.model('User',UserSchema)