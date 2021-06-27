import { Router } from 'express'
import JobModel from '../models/JobModel.js'

const router = Router()

router.post('/requestwork', (request, response, next) => {
  const jobId = request.body.jobId
  const userId = request.body.userId
  const userName = request.body.userName

  JobModel.findById(jobId, (err, data) => {
    if (err) throw err
    if (data.length !== 0) {
      const previoseWorkRequests = data.requests
      console.log(JSON.stringify(previoseWorkRequests))
      if (
        previoseWorkRequests.filter((worker) => worker.fbID === userId)
          .length >= 1
      ) {
        const newWorkRequests = previoseWorkRequests.filter(
          (worker) => worker.fbID !== userId,
        )
        JobModel.updateOne(
          { _id: jobId },
          { requests: newWorkRequests },
          () => {
            response
              .status(201)
              .send([data, { msg: 'You have cancled to work' }])
          },
        )
      } else {
        const newWorkRequests = [
          ...previoseWorkRequests,
          { jobId: jobId, fbID: userId, name: userName },
        ]
        JobModel.updateOne(
          { _id: jobId },
          { requests: newWorkRequests },
          () => {
            response
              .status(201)
              .send([data, { msg: 'You have requested to work' }])
          },
        )
      }
    }
  })
})

router.post('/unrequestwork', (request, response) => {
  const jobId = request.body.jobId
  const userId = request.body.userId

  JobModel.findById(jobId, (err, data) => {
    if (err) throw err
    if (data == null || data == undefined) {
      response.status(200).send({ msg: 'You request has already been cancled' })
    } else {
      if (data.status === 'Taken') {
        response.send({
          msg: 'you can not remove your request when job is taken',
        })
      } else {
        const previoseWorkRequests = data.requests
        const newWorkRequests = previoseWorkRequests.filter(
          (user) => user.id != userId,
        )
        JobModel.findByIdAndUpdate(jobId, { requests: newWorkRequests }, () => {
          response.status(200).send({ msg: 'You request has been cancled' })
        })
      }
    }
  })
})

export default router
