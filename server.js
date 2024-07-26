require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Cat = require('./models/cat.js')
const MONGO_URI = process.env.MONGO_URI

mongoose.connect(MONGO_URI)
app.use(express.json())

mongoose.connection.once('open', () => {
    console.log('Conncection with Mongo is established')
})

mongoose.connection.on('error', () => {
    console.log('MongoDb trippin')
})

app.get('/cats', async (req, res) => {
    try{
        const foundCats = await Cat.find({})
        res.json(foundCats)
    }catch (error) {
        console.error(error)
        res.status(400).json({ message: error.message })

    }
})