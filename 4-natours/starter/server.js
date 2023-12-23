const dotenv = require('dotenv');
dotenv.config({path: './config.env'})
const app = require('./app')

// console.log(app.get('env'))
// console.log(process.env)

//start the server
const port = process.env.PORT || 3000
app.listen(port,() =>{
    console.log(`listening on port ${port}`)
})