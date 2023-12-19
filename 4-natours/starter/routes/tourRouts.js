const express = require('express')
const fs = require('fs')
const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
)
//route handlers
const getAllTours = (req, res) => {
    res
    .status(200)
    .json({
        status: "success",
        results: tours.length,
        requestedAt: req.requestTime,
        data: {tours}
    })
}

const createTour = (req, res) => {
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

}

const getTout =  (req, res) => {
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
}

const updateTour = (req, res) => {

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

}

const deleteTour = (req, res) => {

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

}

const tourRouter = express.Router()

//routes
tourRouter.
    route('/').
    get(getAllTours).
    post(createTour)

tourRouter.
    route('/:id').
    get(getTout).
    patch(updateTour).
    delete(deleteTour)

    module.exports = tourRouter