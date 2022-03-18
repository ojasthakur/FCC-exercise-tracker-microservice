const mongoose = require('mongoose')

const ExerciseSchema = new mongoose.Schema({
    userid: {
        type: String,
        required:[true, 'UserId is required']
    },
    username: {
        type: String
    },
    date: {
        type: String,
        default: Date.now
    },
    dateObject: {
        type: Date  
    },
    duration: {
        type: Number,
        required: [true, 'Please provide duration']
    },
    description: {
        type: String,
        required: [true, 'Please provide description'],
        trim: true,
        maxlength: 30
    },
    
})


module.exports = mongoose.model('Exercise',ExerciseSchema)

// presave for date to convert to required format