import mongoose from 'mongoose'

const { Schema, model } = mongoose

const Post = Schema({
  authorid: String,
  title: String,
  description: String,
  amount: String,
  requests: Array,
  image: String,
  status: String,
  date: String,
})

export default model('posts', Post)
