const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const payrollPeriodSchema = new Schema({
    payrollperiodid: {
        type: Number,
        required: true,
        unique: true,
        trim: true
    },
    payrollperiodname: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
        trim: true
    }
},{
    timestamps: true
});

const PayrollPeriod = mongoose.model('PayrollPeriod', payrollPeriodSchema);
module.exports = PayrollPeriod;