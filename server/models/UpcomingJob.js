import mongoose from 'mongoose'

const { Schema, model } = mongoose

const UpcomingJob = Schema({
  authorid: String,
  title: String,
  description: String,
  requests: Array,
  amount: String,
  image: String,
  status: String,
  date: String,
})

export default model('upcomingjobs', UpcomingJob)
