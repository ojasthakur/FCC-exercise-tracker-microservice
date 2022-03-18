require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()

const cors = require('cors')
const bodyParser = require('body-parser')

const connectDB = require('./db/connect')
const { createUser, getAllUsers } = require('./controllers/userController')
const {createExercise, getExerciseLog} = require('./controllers/excerciseController')
const { create } = require('./models/userModel')



app.use(cors())
app.use(bodyParser.urlencoded({ extended: false}))



app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.get('/api/users', getAllUsers )
app.post('/api/users', createUser)


app.post('/api/users/:_id/exercises',createExercise)
app.get('/api/users/:_id/logs', getExerciseLog)
const start = async ()=>{
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(process.env.PORT, () => {
      console.log(`Server is listening on port ${process.env.PORT}...`);
    })
  } catch (error) {
    console.log(error)
  }
}
start()

// const listener = app.listen(process.env.PORT || 3000, () => {
//   console.log('Your app is listening on port ' + listener.address().port)
// })
