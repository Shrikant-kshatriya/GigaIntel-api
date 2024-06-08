const mongoose = require('mongoose');

// Global Contacts Schema Definition
const globalContactsSchema = new mongoose.Schema({
    number : {
        type: String,
        required: true
    },
    names : [{  // storing an array of names for same number (maybe registered, maybe not)
        type: String,
        required: true
    }] ,
    email : {
        type: String
    }
}); 

// Global Contacts Model
const GlobalContact = mongoose.model('GlobalContact', globalContactsSchema);

module.exports = GlobalContact;

