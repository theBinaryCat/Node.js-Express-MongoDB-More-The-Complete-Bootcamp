const express = require('express')
const fs = require('fs')
const tourRouter = require('./routes/tourRouts')
const morgan = require('morgan')
const app = express()


//get (console.log) info about request 
app.use(morgan('dev'))
//parse request bodes with json 
app.use(express.json())
app.use('/api/v1/tours', tourRouter)
// app.get('/', (req, res) => {
//     res.status(200).send("Hello, world!")
// })
// const tours = JSON.parse(
//     fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
// )

//middleware
app.use((req, res, next) => {
    console.log('this is  a middleware')
    next()
})

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString()
    next()
})


//user routes
//const userRouter = express.Router()

//routes
// userRouter.
//     route('/').
//     get(getAllUsers).
//     post(createUsers)

// tourRouter.
//     route('/:id').
//     get(getTout).
//     patch(updateUsers).
//     delete(deleteUsers)

// app.use('/api/v1/users', userRouter)

//start the server
const port = 3000
app.listen(port,() =>{
    console.log(`listening on port ${port}`)
})