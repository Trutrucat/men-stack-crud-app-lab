require('dotenv').config()
console.log('Dotenv loaded:', process.env.MONGO_URI)
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const path = require('path')
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
app.get('/', (req, res) => {
    res.send('The server is running properly!')
})

app.get('/test', (req, res) => {
    res.send('the server is running properly!')
})

app.listen(3000, () => console.log('I see connected apps'))
