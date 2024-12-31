require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const { connectDB } = require('./config/connectDB')
const authRouter = require('./routes/auth.route')
const errorHandler= require("./middleware/errorHandler.middleware")
const routeNotFound=require("./middleware/routeNotFound.middleware")

//middleware
app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(bodyParser.json())
app.use('/uploads', express.static('uploads'))

//create data base connection
connectDB()

app.get('/', (req, res) => {
  res.send('Welcome to event management API.')
})

//routes
app.use('/api/v1/auth', authRouter)

//middleware
app.use(routeNotFound)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
