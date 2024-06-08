const express = require('express');
const Router = express.Router();
const checkAuth = require('../passportUtil');
const GlobalContact = require('../models/Global');
const User = require('../models/User');

// seacrh by query string
Router.get('/', checkAuth, async (req, res) => {
    try {
        const number = req.query.number;
        
        // if the searched number is registed or not.
        const isRegistered = await User.findOne({number: number});
        if(!isRegistered){
            // Search global contact
            const searchedNumber = await GlobalContact.findOne({number: number});
            if(!searchedNumber){
                res.status(404).json({message: 'Number not found'});
            } else {
                res.status(200).json(searchedNumber);

            }
        } else {
            res.status(200).json(isRegistered);
        }
        
    } catch (error) {
        res.status(500).json({error: error.message});
    }

});
module.exports = Router;