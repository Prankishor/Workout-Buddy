//for accessing env variables
require('dotenv').config()


const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')


//Initialize Express
const app = express()

//Middleware

//use of express.json : any request coming, it looks if it has some body, and parses it and attaches it to the req object
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})


//Routes
app.use('/api/workout', workoutRoutes)

//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //opens the port to Listen for requests
        app.listen(process.env.PORT, () => {
            console.log("Connected to db & listening on port 4000")
        })
    })
    .catch((error) => {
        console.log(error)
    })