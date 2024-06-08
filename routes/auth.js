const express = require("express");
const Router = express.Router();
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const User = require("../models/User");
const GlobalContact = require("../models/Global");

passport.use(new LocalStrategy({
    usernameField: 'number',
    passwordField: 'password'
}, async (number, password, done) => {
    try {
        const user = await User.findOne({ number });
        if (!user) {
            return done(null, false, { message: 'Incorrect number.' });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
    } catch (err) {
        return done(err);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

Router.post('/register', async (req, res) => {
    try {
        const { number, email, name, password } = req.body;
        
        const userExists = await User.findOne({ number });
        if (userExists) {
            return res.status(400).json({ message: "User already exists." });
        }
        
        const newUser = new User({ number, email, name, password });
        await newUser.save();

        // adding the new registered user to the Global contact
        const globalExists = await GlobalContact.findOne({number: newUser.number});
        if(globalExists) {
            globalExists.names.push(newUser.name);
        }else {
            const newGlobal = new GlobalContact({number: newUser.number, names: [newUser.name], email: newUser.email});
            await newGlobal.save();   
        }
        
        res.status(200).json(newUser);
    } catch (error) {
        res.status(500).json({ message: "Registration failed.", error: error.message });
    }
});

Router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.status(400).json({ message: info.message });

        req.login(user, (err) => {
            if (err) return next(err);
            res.status(200).json({message: 'Login successful'});
        });
    })(req, res, next);
});

Router.post('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ message: 'Logout failed.', error: err.message });
        }
        res.status(200).json({ message: 'Logout successful' });
    });
});



module.exports = Router;
