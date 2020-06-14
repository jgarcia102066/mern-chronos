const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const timeTypeSchema = new Schema({
    timetypecode: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    timetypename: {
        type: String,
        required: true,
        trim: true
    }
},{
    timestamps: true
});

const TimeType = mongoose.model('TimeType', timeTypeSchema);
module.exports = TimeType;