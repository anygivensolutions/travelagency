require('dotenv').config();
const mongoose = require('mongoose');
const Contact = require('./models/contact');
const Faker = require('faker');
mongoose.Promise = global.Promise
mongoose.connect(`mongodb://${process.env.USERNAME}:${process.env.PSWD}@localhost/${process.env.DB}?authSource=${process.env.SOURCE}`, {useNewUrlParser: true});


let myContact = new Contact ({
    firstName: Faker.name.firstName(),
    lastName: Faker.name.lastName(),
    email: Faker.internet.email(),
    homePhone: Faker.phone.phoneNumber(),
    cell: Faker.phone.phoneNumber(),
    address: Faker.address.streetAddress(),
    city: Faker.address.city(),
    state: Faker.address.state(),
    zipcode: Faker.address.zipCode()
});


var fakeContacts = [];
var amountOfContacts = 1000;

myContact.save((err) => {
    if(err) {
     console.log(err);
    } else {
        console.log('===== Saved another Contact =====!');
        console.log(myContact.firstName);
    }
});

