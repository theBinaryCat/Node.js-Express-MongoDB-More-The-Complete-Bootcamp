const fs = require('fs')
const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
)

//route handlers
exports.getAllTours = (req, res) => {
    res
    .status(200)
    .json({
        status: "success",
        results: tours.length,
        requestedAt: req.requestTime,
        data: {tours}
    })
}

exports.createTour = (req, res) => {
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

exports.getTout =  (req, res) => {
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

exports.updateTour = (req, res) => {

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

exports.deleteTour = (req, res) => {

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