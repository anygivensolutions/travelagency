require('dotenv').config();
const mongoose = require('mongoose');
const Contact = require('./models/contact');

mongoose.Promise = global.Promise
mongoose.connect(`mongodb://${process.env.USERNAME}:${process.env.PSWD}@localhost/${process.env.DB}?authSource=${process.env.SOURCE}`, {useNewUrlParser: true});


let myContact = new Contact ({
    firstName: 'Kris',
    lastName: 'Carter',
    email: 'youknow@solutions.com',
    homePhone: '70684848888',
    cell: '8788843838',
    address: '421 temple dr.',
    city: 'fortson',
    state: 'IA',
    zipcode: '83991'
});

myContact.save((err) => {
    if(err) {
        console.log(err);
    } else {
        console.log('===== Saved another Contact =====!');
    }
});
