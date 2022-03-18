const Exercise = require('../models/exerciseModel')

const User = require('../models/userModel')

const createExercise = async (req, res) => {
    // console.log(req.params._id)
    const user = await User.findOne({
        _id: req.params._id
    })
    if (!user) {
        return res.json('no user with given id')
    }
    req.body.userid = req.params._id
    req.body.username = user.username
    
    if (!req.body.date) {
        console.log('here')
        const todayDate = new Date().toDateString()
        req.body.date = todayDate
    } else {
        const dateString = new Date(req.body.date).toDateString()

        req.body.date = dateString

    }

    
    const exercise = Exercise(req.body)
    await exercise.save()
    res.json({
        _id: exercise.userid,
        username: exercise.username,
        date: exercise.date,
        duration: exercise.duration,
        description: exercise.description
    })
}

const getExerciseLog = async (req, res) => {
    const user = await User.findOne({
        _id: req.params._id
    })
    if (!user) {
        return res.json('no user with given id')
    }
    const fieldList = '-_id description duration date'
    // console.log(req.query)
    let { from, to, limit } = req.query
    // const from = new Date(req.query.from)
    
    const result = await Exercise.find({
        userid: user._id
    }).select(fieldList).limit(limit)
    
    let logs
    if (from && to) {
        from = new Date(from)
        
        to = new Date(to)

        logs = result.filter(exercise => {
            const dateObject = new Date(exercise.date)

            return from <= dateObject && dateObject <= to
        })
        return res.json({
            _id: user._id,
            username: user.username,
            count: logs.length,
            log: logs
        })

    }
    if (from) {
        from = new Date(from)

        logs = result.filter(exercise => {
            const dateObject = new Date(exercise.date)
            console.log(dateObject, from)
            return dateObject >= from
        })
        
        return res.json({
            _id: user._id,
            username: user.username,
            count: logs.length,
            log: logs
        })
    }
    if (to) { 
        to = new Date(to)

        logs = result.filter(exercise => {
            const dateObject = new Date(exercise.date)
            return dateObject <= to
        })
        
        return res.json({
            _id: user._id,
            username: user.username,
            count: logs.length,
            log: logs
        })
    }
  
    logs = result
    res.json({
        _id: user._id,
        username: user.username,
        count: logs.length,
        log: logs
    })
}

module.exports = {createExercise, getExerciseLog}