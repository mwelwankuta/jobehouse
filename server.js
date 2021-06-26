import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import 'dotenv/config'

import PostModel from './models/JobModel.js'
import JobModel from './models/JobModel.js'
import UpcomingJob from './models/JobModel.js'

import authenticate from './routes/authenticate.js'
import requestwork from './routes/requestwork.js'

// Init app
const app = express()
const port = process.env.PORT || 7000
app.listen(port, () => console.log(`Listening on port ${port}`))

// Databse Connection
const databaseUri =
  process.env.MONGODB_CONNECTION_URI || 'mongodb://localhost:27017/jobeHouse'
  mongoose.connect(
    databaseUri,
    {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    },
  )
mongoose.connection.once('open', () => console.log('Database connected...'))
mongoose.connection.on('error', () =>
  console.log('Failed to connect to database...'),
)

// Middleware
app.use(cors())
app.use(express.json())

app.use(authenticate) // signup and login user

app.use(requestwork) // request to work and unrequest

app
  .route('/jobs')
  .post((request, response) => {
    const job = {
      title: request.body.title,
      description: request.body.description,
      requestuests: [],
      status: request.body.status,
      image: request.body.image,
      authorid: request.body.authorid,
      date: Date.now(),
    }

    PostModel.create(job, (err, jobs) => {
      if (err) throw err
      response.status(201).send(jobs)
    })
  })
  .get((request, response) => {
    JobModel.find({}, (err, jobs) => {
      if (err) throw err
      response.status(200).send(jobs)
    })
  })

// Delete Jobs
app.post('/deletejob', (request, response) => {
  JobModel.deleteOne(
    {
      authorid: request.fbID,
      _id: request.id,
    },
    () => {
      response.status(200).send({ msg: 'deleted job' })
    },
  )
})

app.post('/deleteupcoming', (request, response) => {
  UpcomingJob.deleteOne(
    {
      authorid: request.fbID,
      _id: request.id,
    },
    () => {
      response.status(200).send({ msg: 'deleted scheduled job' })
    },
  )
})
