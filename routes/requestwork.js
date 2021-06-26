import { Router } from 'express'
import JobModel from '../models/JobModel.js'

const router = Router()

router.post('/requestwork', (request, response) => {
  const jobId = request.body.jobId
  const userId = request.body.userId
  const userName = request.body.name

  JobModel.findById(jobId, (err, data) => {
    if (err) throw err
    console.log(data, ' this is the data')
    if (data.length !== 0) {
      console.log(data)

      const previoseWorkRequests = data.requests
      const newWorkRequests = [
        ...previoseWorkRequests,
        {
          id: userId,
          name: userName,
        },
      ]
      JobModel.updateOne({ _id: jobId }, { requests: newWorkRequests }, () => {
        response.status(201).send({ msg: 'You have requested to work' })
      })
    } else {
      response.send({ msg: 'error occured' })
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
