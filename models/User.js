const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Registed User Schema Definition 
const userSchema = new mongoose.Schema({
    number : {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name : {
        type: String,
        required: true        
    },
    email : {
        type: String,
    },
    contacts : [{
        number : {
            type: String,
            required: true    
        },
        name : {
            type: String,
            required: true 
        }
    }]
});

// Pre-save hook to hash the password
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Method to compare password
userSchema.methods.comparePassword = function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;