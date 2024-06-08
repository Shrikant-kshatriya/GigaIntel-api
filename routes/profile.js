const express = require('express');
const Router = express.Router();
const User = require('../models/User');
const checkAuth = require('../passportUtil');

// response with the current logged in user profie
Router.get('/', checkAuth, async (req, res) => {
    try {
        const user = await User.findById({_id : req.user.id}); 
        res.json(user); 
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch users', error: error });
    }
});

module.exports = Router;