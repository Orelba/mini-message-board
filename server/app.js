const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const messagesRouter = require('./routes/messages')

const app = express()

// mongoDB connection setup
mongoose.set('strictQuery', false)
const mongoDB = process.env.MONGODB_URI

main().catch((err) => console.log(err))
async function main() {
  await mongoose.connect(mongoDB)
}

app.use(logger('dev'))
app.use(cors(
  {
    origin: ['*'],
    methods: ['POST', 'GET'],
    credentials: true,
  }
))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/api/messages', messagesRouter)

module.exports = app
