const mongoose = require('mongoose')

const CatSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: String,
})

const Cat = mongoose.model('Cat', catSchema)

module.exports = Cat