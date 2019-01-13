var mongoose = require('mongoose');

var contactSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    homePhone: String,
    cell: String,
    address: String,
    city: String,
    state: String,
    zipcode: String,
    Notes: []
});

module.exports = mongoose.model('Contact', contactSchema);
