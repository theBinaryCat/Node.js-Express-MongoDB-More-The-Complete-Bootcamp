const express = require('express')
const fs = require('fs')
const app = express()

//parse request bodes with json 
app.use(express.json())

// app.get('/', (req, res) => {
//     res.status(200).send("Hello, world!")
// })
const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
)

//get all tours
app.get('/api/v1/tours', (req, res) => {
    res
    .status(200)
    .json({
        status: "success",
        results: tours.length,
        data: {tours}
    })
})
//post a tour
app.post('/api/v1/tours', (req, res) => {
    const tourId = tours[tours.length-1].id + 1
    const newTour = Object.assign({id: tourId}, req.body)
    tours.push(newTour)

    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err =>{
        res.status(201).json({
            status: "success",
            data:{
                tour: newTour,
            }
        })
    })

})

//get tour
app.get('/api/v1/tours/:id', (req, res) => {
    id = req.params.id * 1

    const tour = tours.find(el => el.id === id)

    if(!tour){
        res.status(404).json({
            status: "failed",
            message: "Invalid tour Id"
        })
    }

    res.status(200).json({
        status : "success",
        data: {tour}
    })
})

//update tour
app.patch('/api/v1/tours/:id', (req, res) => {

    if(tours.length < req.params.id * 1){
        res.status(404).json({
            status: "failed",
            message: "Invalid tour Id"
        })
    }

    res.json({
        status: "success",
        data: "tour has been updated"
    })

})

//delete tour
app.delete('/api/v1/tours/:id', (req, res) => {

    if(tours.length < req.params.id * 1){
        res.status(404).json({
            status: "failed",
            message: "Invalid tour Id"
        })
    }

    res.status(204).json({
        status: "success",
        data: null
    })

})
const port = 3000
app.listen(port,() =>{
    console.log('listening on port ${port}')
})