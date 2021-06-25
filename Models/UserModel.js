import mongoose from 'mongoose'

const { Schema, model } = mongoose

const Post = Schema({
  userid: String,
  name: String,
  picture: String,
  bio: String,
  upvotes: Array,
  downvotes: Array,
  email: String,
  phone: String,
  createdAt: String,
  loggedin: Boolean,
})

export default model('users', Post)
