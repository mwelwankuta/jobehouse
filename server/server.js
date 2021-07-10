import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import fileUpload from 'express-fileupload'
import { graphqlHTTP } from 'express-graphql'
import uploadPostImage from './routes/uploadPostImage.js'

import RootQuery from './graphql/RootQuery.js'
import 'dotenv/config'

const app = express()
const port = process.env.PORT || 7000
app.listen(port, () => console.log(`Listening on port ${port}`))

const { MONGODB_CONNECTION_URI, OFFLINE_CONNECTION_URI } = process.env

mongoose.connect(OFFLINE_CONNECTION_URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})
mongoose.connection.once('open', () => console.log('Database connected...'))
mongoose.connection.on('error', () =>
  console.log('Failed to connect to database...'),
)

app.use(cors())
app.use(fileUpload())
app.use(
  '/graphql',
  graphqlHTTP({
    graphiql: true,
    schema: RootQuery,
  }),
)

app.use('upload', uploadPostImage)

// app.post('/requestnotifications', (request, response) => {
//   const fbId = request.body.fbId
//   JobModel.find({ authorid: fbId }, (err, upcomingJobs) => {
//     if (err) throw err
//     const upcominJgobsWithRequests = upcomingJobs.filter(
//       (upcomingJob) => upcomingJob.requests.length > 0,
//     )
//     response.status(200).send(upcomingJobsWithRequests)
//   })
// })
