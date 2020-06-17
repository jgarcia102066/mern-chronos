const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userTimeTakenSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    timetype: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TimeType'
    },
    payrollperiod: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PayrollPeriod'
    },
    hours: {
        type: Number,
        required: true,
        default: 0
    }
},{
    timestamps: true
});

const UserTimeTaken = mongoose.model('UserTimeTaken', userTimeTakenSchema);
module.exports = UserTimeTaken;