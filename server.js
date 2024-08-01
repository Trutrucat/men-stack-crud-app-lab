require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Cat = require('./models/cat.js')
const PORT = 3000
const MONGO_URI = process.env.MONGO_URI
const logger = require('morgan')
const methodOverride = require('method-override')

app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(logger('tiny'))
app.use(methodOverride('_method'))
app.use(express.static(__dirname))

mongoose.connect(MONGO_URI)

mongoose.connection.once('open', () => {
    console.log('Conncection with Mongo is established')
})

mongoose.connection.on('error', () => {
    console.log('MongoDb trippin')
})

app.post('/cats', async (req, res) => {
    req.body.readyToAdopt === 'on' || req.body.readyToAdopt === true?
    req.body.readyToAdopt = true:
    req.body.readyToAdopt = false
    try{
        const createdCat = await Cat.create(req.body)
        res.redirect(`/cats/${createdCat._id}`)
    } catch(error) {
        res.status(400).json({ message: error.message })
    }
})

app.get('/cats/new', (req, res) => {
    res.render('new.ejs')
})

app.get('/cats', async (req, res) => {
    try{
        const foundCats = await Cat.find({})
        res.render('index.ejs', {
            cats: foundCats
        })
    }catch (error) {
        res.status(400).json({ message: error.message })

    }
})

app.get('/cats/:id', async (req, res) => {
    try {
        const foundCat = await Cat.findOne({ _id: req.params.id })
        res.render('show.ejs', {
            cat: foundCat
        })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})
app.get('/', (req, res) => {
    res.send('The server is running properly!')
})

app.put('/cats/:id', async (req, res) => {
    req.body.readyToAdopt === 'on' || req.body.readyToAdopt === true?
    req.body.readyToAdopt = true:
    req.body.readyToAdopt = false
    try{
        const updatedCat = await Cat.findOneAndUpdate({ _id:req.params.id }, req.body, { new: true})
        res.redirect(`/cats/${updatedCat._id}`)
    } catch(error){
        res.status(400).json({ message: error.message })
    }
})

app.get('/cats/:id/edit', async (req, res) => {
    try{
        const foundCat = await Cat.findOne({ _id:req.params.id })
        res.render('edit.ejs', {cat: foundCat})
    }catch(error){
        res.status(400).json({ message: error.message })
    }
})

app.delete('/cats/:id', async (req, res) => {
    try{
        await Cat.findOneAndDelete({ _id: req.params.id})
        res.redirect('/cats')
    }catch(error){
        res.status(400).json({ message: error.message})
    }
})

app.listen(PORT, () => {
    console.log('I see connected apps' + ` application is expecting requests on PORT ${PORT}`)
    
})
