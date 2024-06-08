const express = require('express');
const Router = express.Router();
const checkAuth = require('../passportUtil');
const GlobalContact = require('../models/Global');
const Spam = require('../models/Spam')

// Spam Likelihood
const spamLikelihood = async (entries) => {
    // the current date and time
    const now = Date.now();

    const startOfToday = new Date(now);
    startOfToday.setHours(0, 0, 0, 0); 

    // date time five days ago
    const fiveDaysAgo = new Date(startOfToday);
    fiveDaysAgo.setDate(startOfToday.getDate() - 5);

    let todaysSpamCount = 0;
    let lastFiveDaysSpamCount = 0;
    let beforeFiveDaysSpamCount = 0;

    // Calculate counts based on time periods
    if (entries) {
        entries.forEach(entry => {
            const entryTime = entry.time;
            if (entryTime >= startOfToday) {
                todaysSpamCount++;
            } else if (entryTime > fiveDaysAgo) {
                lastFiveDaysSpamCount++;
            } else {
                beforeFiveDaysSpamCount++;
            }
        });

        // logic : spams reported today will have full credibility(*1), spams reported in the last five days will have less cerdibility(*0.8), spams reported before last five days will have (*0.5) credibility. 
        const spamLikeli = ((todaysSpamCount*1) + (lastFiveDaysSpamCount*0.8) + (beforeFiveDaysSpamCount*0.5))/entries.length * 100;
        console.log(spamLikeli);
        return spamLikeli;
    } else {
        return 0;
    }

};

// get a contact from global contact
Router.get('/', checkAuth, async (req, res) => {
    try {
        const {number, name} = req.query;
        const contact = await GlobalContact.findOne({number: number});
        // checking spam likelihood
        const spamEntries = await Spam.findById(contact._id).select('spamEntry.time'); 
        const spamLikeli = await spamLikelihood(spamEntries.spamEntry);
        const response = {
            name: name,
            number: contact.number,
            email: contact.email,
            spamlikelihood : spamLikeli
        }
        res.status(200).json(response);
        
    } catch (error) {
        res.status(500).json(error);
    }
    
});

module.exports = Router;