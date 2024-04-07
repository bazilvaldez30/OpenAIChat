// dependencies
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const chatRoutes = require('./routes/chatRoutes')

const app = express()

// middlewares
app.use(cors())
app.use(express())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// connect to database
mongoose.set('strictQuery', true)
mongoose
  .connect(
    'mongodb+srv://bazilvaldez30:dummypassword@openaichatbackend.zkiyhqd.mongodb.net/OpenAI?retryWrites=true&w=majority&appName=OpenAIChatBackend'
  )
  .then(() => {
    app.listen(process.env.PORT || 4000, () => {
      console.log(`Connected to database & port`)
    })
  })
  .catch((error) => {
    console.log(error)
  })

app.use('/', chatRoutes)
