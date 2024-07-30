const mongoose = require('mongoose')

const catSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  readyToAdopt: { type: Boolean, required: true },
  image: String,
})

const Cat = mongoose.model('Cat', catSchema)

module.exports = Cat