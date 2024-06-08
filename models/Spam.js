const mongoose = require('mongoose');
const User = require('./User');
const GlobalContact = require('./Global');

// Spam Schema Definition
const spamSchema = new mongoose.Schema({
    _id : {  // The spam number is part of global contacts hence we ref the objectID of spam numbers with GlobalContact
        type : mongoose.Schema.Types.ObjectId,
        ref : GlobalContact,
        required : true
    },
    number : {
        type : String,
        required : true
    },
    spamEntry : [{  // Spam Entry storing an array of spam reports by registed users and the time of the spam report
        Userid: {
            type : mongoose.Schema.Types.ObjectId,  // Userid in ref to the User model
            ref : User
        },
        time: {
            type : Date,
            required : true
        }
    }]
});

// Spam Model
const Spam = mongoose.model('Spam', spamSchema);

module.exports = Spam;
