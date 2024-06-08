require('dotenv').config();
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const db = require('./db');

const profile = require('./routes/profile');
const auth = require('./routes/auth');
const spam = require('./routes/spam');
const search = require('./routes/search');
const contact = require('./routes/contact');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: "truecaller maybe??",
    resave: false,
    saveUninitialized: false
}));

// Conect DB
db();

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', auth);
app.use('/profile', profile);
app.use('/spam', spam);
app.use('/search', search);
app.use('/contacts', contact);

app.listen(process.env.PORT, () => {
    console.log('server is running on port'+ process.env.PORT);
});