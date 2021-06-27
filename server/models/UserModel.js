import mongoose from 'mongoose'

const { Schema, model } = mongoose

const User = Schema({
  fbID: String,
  name: String,
  picture: String,
  bio: String,
  upvotes: Array,
  downvotes: Array,
  email: String,
  createdAt: String,
})

export default model('users', User)
