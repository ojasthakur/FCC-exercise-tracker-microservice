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
        const dateObject = new Date()
        const todayDate = new Date().toDateString()
        req.body.date = todayDate
        req.body.dateObject = dateObject
    } else {
        const dateString = new Date(req.body.date).toDateString()
        const dateObject = new Date(req.body.date)

        req.body.date = dateString
        req.body.dateObject = dateObject

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

    // console.log(req.query)
    let { from, to, limit } = req.query
    // const from = new Date(req.query.from)
    
    const result = await Exercise.find({
        userid: user._id
    }).limit(limit)
    
    let logs
    if (from && to) {
        from = new Date(from)
        console.log('from-date: ', from)
        
        to = new Date(to)
        console.log('to-date: ',to)

        logs = result.filter(exercise => {
            console.log('from- ', from, 'exercise- ', exercise.dateObject, 'to- ', to)
            return from <= exercise.dateObject && exercise.dateObject <= to
        })
        // if (limit) {
            // logs = logs.limit(limit)
        // }
        return res.json({
            _id: user._id,
            username: user.username,
            count: logs.length,
            log: logs
        })

    }
    if (from) {
        from = new Date(from)
        console.log('from-date: ',from)

        logs = result.filter(exercise => {
            return exercise.dateObject >= from
        })
        // if (limit) {
            // logs = logs.limit(limit)
        // }
        return res.json({
            _id: user._id,
            username: user.username,
            count: logs.length,
            log: logs
        })
    }
    if (to) { 
        to = new Date(to)
        console.log('to-date: ',to)

        logs = result.filter(exercise => {
            return exercise.dateObject <= to
        })
        // if (limit) {
            // logs = logs.limit(limit)
        // }
        return res.json({
            _id: user._id,
            username: user.username,
            count: logs.length,
            log: logs
        })
    }
    // const logs = await Exercise.find({
    //     userid: user._id
    // })
    // const logs = await Exercise.find({
    //     userid: user._id,
    //     date: {
    //         $gt: from
    //     }
    // }, '-_id description duration date dateObject')
        // .sort({ duration: 1 }).limit(1)
  
    logs = result
    res.json({
        _id: user._id,
        username: user.username,
        count: logs.length,
        log: logs
    })
}

module.exports = {createExercise, getExerciseLog}