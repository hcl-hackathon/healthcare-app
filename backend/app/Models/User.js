const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 64,
        unique: true // check user name to be unique
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
                return isEmail(value)
            },
            message: function () {
                return 'invalid email format'
            }
        }
    },
    password: {
        type: String,
        minlength: 8,
        maxlength: 128
    },
    role: {
        type: String,
        required: [true, "role is required"],
        enum: ['provider', 'patient']
    },
    age: {
        type: Number,
        minlength: 0,
        maxlength: 100
    },
    address: {
        city: {
            type: String
        },
        state: {
            type: String
        },
        country: {
            type: String
        }
    },
    healthInfo: [{
        illness: {
            type: String
        },
        medication: {
            type: String
        },
        advice: {
            type: String
        }
    }],
    waterIntake: {
        type: Number
    },
    steps: {
        type: Number
    }
}, options)

function omitPrivate(doc, obj) {
    delete obj.__v;
    return obj;
}

// schema options
var options = {
    toJSON: {
        transform: omitPrivate
    }
};
const User = mongoose.model('User', userSchema)
module.exports = User