const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const timeCalculatorSchema = new Schema({
    payrollperiod: {
        type: PayrollPeriod,
        required: true,
        unique: true,
        trim: true
    },
    previousbalance: {
        type: Number,
        required: true,
        trim: true,
        default: 0
    },
    accrualadjustment: {
        type: Number,
        required: true,
        trim: true,
        default: 0
    },
    timetaken: {
        type: Number,
        required: true,
        trim: true,
        default: 0,
        min: 0
    },
    currentbalance: {
        type: Number,
        required: true,
        trim: true,
        default: 0
    }
},{
    timestamps: true
});

const TimeCalculator = mongoose.model('TimeCalculator', timeCalculatorSchema);
module.exports = TimeCalculator;