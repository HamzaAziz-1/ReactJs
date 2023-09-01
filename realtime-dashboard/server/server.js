const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const morgan = require('morgan')
const cors = require('cors')
dotenv.config()

const userRoute = require('./routes/userRoute')

app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))

mongoose.connect(process.env.URI).then(() => {
    console.log('Database Connected')
    app.listen(process.env.PORT || 8000, (err) => {
        if (err) {
            console.log(err)
        }
        else {
            console.log("Runnung Successfully At", process.env.PORT)
        }
    })
}).catch((error) => {
    console.log('error', error)
})

app.use('/user', userRoute) 