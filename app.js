const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const hbs = require('hbs');
const methodOverride = require('method-override');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const passportLocalMongoose = require('passport-local-mongoose');
const serveStatic = require('serve-static');
const expressSanitize = require('express-sanitizer');
const User = require('./models/user');
const Contact = require('./models/contact');
const app = express();
require('dotenv').config();
//db config
mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${process.env.USERNAME}:${process.env.PSWD}@localhost/${process.env.DB}?authSource=${process.env.SOURCE}`, {useNewUrlParser: true});
// app config
app.set('view engine', 'hbs');
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(expressSanitize());
//hbs registration
hbs.registerPartials(__dirname + '/views/partials');
//serve public routes 
app.use(serveStatic('public'));


app.get('/', (req, res) => {
    res.render('landing');
});
// show contacts list 
app.get('/contacts', (req, res) => {
    Contact.find().exec(function(err, allContacts) {
        if(err){
            console.log(err)
        } else {
            res.render('contacts/index',{
                pageTitle: 'Address Book',
                contacts: allContacts
            });
        }
    });
});

//create new contact 
app.get('/contacts/new', (req, res) => {
    res.render('contacts/contactForm');
});
//add new contact 
app.post('/contacts/new', (req, res) => {
    console.log(req.body.contact);
    Contact.create(req.body.contact, function(err, newContact){
        if(err){
        console.log(err);
        res.render('contacts/index');
        } else {
        res.redirect('/contacts');
        }
    });
});
//show one contact 
app.get('/:id', (req, res) => {
    Contact.findById(req.params.id).populate('contact').exec(function(err, foundContact){
    if(err) {
        console.log(err);
    } else {
        console.log(foundContact);
        res.render('contacts/show', {
            contact: foundContact
        });
        }
    });
});
// show form to create new contact
app.get('/addressbook/new', (req, res) => {
    res.render('addressbook/contactForm');
});
// add new contact 
app.post('/addressbook/contact/new', (req, res) => {
    
});
app.get('/paymentbook', (req, res) => {
    res.render('paymentbook/index');
});

app.listen(3000, () => {
    console.log('=====Serving Wanda\'s Tours =====');
});
