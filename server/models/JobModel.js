import mongoose from 'mongoose'

const { Schema, model } = mongoose

const Job = Schema({
  authorid: String,
  title: String,
  description: String,
  requests: Array,
  image: String,
  status: String,
  date: String,
})

export default model('posts', Job)