const express = require('express')
const fs = require('fs')
const app = express()

// app.get('/', (req, res) => {
//     res.status(200).send("Hello, world!")
// })
const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
)

app.get('/api/v1/tours', (req, res) => {
    res
    .status(200)
    .json({
        status: "success",
        data: {tours}
    })
})

const port = 3000
app.listen(port,() =>{
    console.log('listening on port ${port}')
})