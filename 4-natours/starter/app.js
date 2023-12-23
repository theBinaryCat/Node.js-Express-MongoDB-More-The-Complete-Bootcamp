const express = require('express')
const fs = require('fs')
const tourRouter = require('./routes/tourRoutes')
const userRouter = require('./routes/userRoutes')
const morgan = require('morgan')
const app = express()

//middleware
//get (console.log) info about request 
if(process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'))
}
//parse request bodies with json 
app.use(express.json())
//use static files
app.use(express.static(`${__dirname}/public`))
app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users',userRouter)
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString()
    next()
})

module.exports = app