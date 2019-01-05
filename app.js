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

app.get('/addressbook', (req, res) => {
    res.render('addressbook/index');
});
 
app.get('/paymentbook', (req, res) => {
    res.render('paymentbook/index');
});

app.listen(3000, () => {
    console.log('=====Serving Wanda\'s Tours =====');
});
