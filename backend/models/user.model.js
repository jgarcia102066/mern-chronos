const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema ({
    usercode: {
        type: String,
        required: true,
        trim: true,
        length: 9,
        unique: true
    },
    username : {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50
    },
    departmentcode: {
        type: String,
        required: true,
        trim: true,
        length: 6
    },
    useractive: {
        type: Boolean,
        default: true
    }
},{
    timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;