const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const hbs = require('hbs')
const methodOverride = require('method-override')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const passportLocalMongoose = require('passport-local-mongoose')
const serveStatic = require('serve-static')
const expressSanitize = require('express-sanitizer')
const User = require('./models/user')
const Contact = require('./models/contact')
const app = express()
require('dotenv').config()
// db config
mongoose.Promise = global.Promise
mongoose.connect(`mongodb://${process.env.USERNAME}:${process.env.PSWD}@localhost/${process.env.DB}?authSource=${process.env.SOURCE}`, { useNewUrlParser: true })
// app config
app.set('view engine', 'hbs')
app.use(passport.initialize())
app.use(passport.session())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(expressSanitize())
// hbs registration
hbs.registerPartials(__dirname + '/views/partials')
// serve public routes
app.use(serveStatic('public'))

app.get('/', (req, res) => {
  res.render('landing')
})
// show contacts list
app.get('/contacts', (req, res) => {
  Contact.find().sort({firstName:1}).exec(function(err, allContacts) {
    if  (err)  {
      console.log(err)
    } else {
      res.render('contacts/index',{
        pageTitle: 'Address Book',
        contacts: allContacts
      })
    }
  })
})

//show new contact form
app.get('/contacts/new', (req, res) => {
  res.render('contacts/contactForm')
})
//create new contact 
app.post('/contacts/new', (req, res) => {
  Contact.create(req.body.contact, function(err, newContact){
    if(err) {
      console.log(err)
      res.render('contacts/index')
    } else {
      res.redirect('/contacts')
      console.log(newContact)
    }
  })
})
//show one contact 
app.get('/contacts/:id', (req, res) => {
  Contact.findById(req.params.id).populate('contact').exec(function(err, foundContact){
    if(err) {
      console.log(err)
    } else {
      console.log(foundContact)
      res.render('contacts/show', {
        contact: foundContact
      })
    }
  })
});
// edit contact
app.get('/contacts/:id/edit', (req, res) => {
  Contact.findById(req.params.id).populate('contact').exec(function(err, foundContact){
    if (err) {
      console.log(err)
    } else {
      console.log(foundContact)
      res.render('contacts/edit', {
        contact: foundContact
      })
    }
  })
})
// update contact
app.put('/contacts/:id', (req, res) => {
  Contact.findByIdAndUpdate(req.params.id, req.body.contact, function (err, updatedContact) {
    if (err) {
      console.log(err)
      res.redirect('/')
    } else {
      res.redirect('/contacts/' + req.params.id)
    }
  })
})
// delete contact
app.delete('/contacts/:id', (req, res) => {
  Contact.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      res.redirect('/contacts/' + req.params.id)
    } else {
      res.redirect('/contacts')
    }
  })
})
app.get('/paymentbook', (req, res) => {
  res.render('paymentbook/index')
})

app.listen(3000, () => {
  console.log('=====Serving Wanda\'s Tours =====')
})
