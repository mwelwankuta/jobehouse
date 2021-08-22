const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const Room = Schema({
  authorid: String,
  title: String,
  description: String,
  people: Array,
  status: String,
  date: String,
});

module.exports = model("rooms", Room);
