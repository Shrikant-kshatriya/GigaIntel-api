const express = require('express');
const Router = express.Router();
const checkAuth = require('../passportUtil');
const Spam = require('../models/Spam');
const GlobalContact = require('../models/Global');

Router.post('/', checkAuth, async (req, res) => {
    try {
        const number = req.body.number;  // getting the number to mark as spam

    // mark the number as spam
    const spamExists = await Spam.findOne({number: number});
    if(spamExists) {  // existing spam so pushing a entry
        spamExists.spamEntry.push({Userid: req.user.id, time: Date.now()});
        await spamExists.save();
    } else {
        const existingGlobalContact = await GlobalContact.findOne({number: number});
        const newSpam = new Spam({_id: existingGlobalContact._id, number: number, spamEntry: [{Userid: req.user.id, time: Date.now()}]});
        await newSpam.save();
    }
    res.status(200).json({message: 'Flagged'});
} catch (error) {
        res.status(500).json({error: error.message});
    }
    
});

module.exports = Router;