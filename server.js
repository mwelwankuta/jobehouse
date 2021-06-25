import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

import PostModel from './Models/PostModel.js'
import UserModel from './Models/UserModel.js'

import dotenv from 'dotenv'
dotenv.config()

const app = express()
const port = process.env.PORT || 4000
app.listen(port, () => console.log(`Listening on port ${port}`))

// process.env.MONGODB_CONNECTION_URI
mongoose.connect('mongodb://localhost:27017/jobeHouse', {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
mongoose.connection.once('open', () => console.log('Database connected...'))
mongoose.connection.on('error', () =>
  console.log('Failed to connect to database...'),
)

// Middleware
app.use(cors())
app.use(express.json())

//  POST /login
app.post('/login', (req, res) => {
  // code goes here
  UserModel.find({ userid: req.body.userid }, (err, data) => {
    console.log(data)
    if (err)
      res.status(500).json({ msg: 'Server error, please try again later' })
    if (data) {
      res.status(200).json(data)
    } else {
      res
        .status(201)
        .json([data, { msg: "Welcome to JobeHouse, hope you'll lve it here" }])
    }
  })
})

//  POST /signup
app.post('/signup', (req, res) => {
  // code goes here
  UserModel.find({ userid: req.body.userid }, (err, data) => {
    console.log(data)
    if (data) {
      res.status(201).send([data, { msg: "Welcome to JobeHouse, hope you'll lve it here" },])
    } else {
      UserModel.create(req.body, (err, data) => {
        if (err) {
          res.status(500).send({ msg: 'Server error, please try again later' })
        }
        res.status(200).send(data)
      })
    }

  })
})

//  POST /posts
app.post('/posts', (req, res) => {
  // code goes here
  const post = {
    title: req.body.title,
    description: req.body.description,
    requests: [],
    status: req.body.status,
    image: req.body.image,
    authorid: req.body.authorid,
  }

  PostModel.create(post, (err, data) => {
    console.log(data)
    res.send(data)
  })
  // saves to database
})
