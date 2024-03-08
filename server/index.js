const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const messagesRouter = require('./routes/messages')

const compression = require('compression')
const helmet = require('helmet')

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
    origin: ['https://boardy-messages.vercel.app'],
    methods: ['POST', 'GET'],
    credentials: true,
  }
))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

// Set secure HTTP response headers, allow Google fonts to be loaded
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        'font-src': ['self', 'fonts.googleapis.com', 'fonts.gstatic.com']
      }
    }
  })
)

// Compress response bodies for all requests
app.use(compression())

app.use(express.static(path.join(__dirname, 'public')))

app.use('/api/messages', messagesRouter)

module.exports = app
