const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const departmentSchema = new Schema({
    departmentcode: {
        type: String,
        required: true,
        length: 6,
        unique: true,
        trim: true
    },
    departmentname: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
        trim: true
    },
    departmentactive: {
        type: Boolean,
        default: true
    }
},{
    timestamps: true
});

const Department = mongoose.model('Department', departmentSchema);
module.exports = Department;