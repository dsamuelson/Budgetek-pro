const { Schema } = require('mongoose');
const PDBreakdownSchema = require('./PDBreakdown');
const UOMESchema = require('./Uoweme');

const IncomeSchema = new Schema ({
    incomeTitle: {
        type: String,
        required: true
    },
    incomeValue: {
        type: Number,
        required: true
    },
    incomeFrequency: [PDBreakdownSchema],
    primaryIncome: {
        type: Boolean,
        required: true,
        default: false
    },
    uomePayInfo: [UOMESchema],
    payDay: {
        type: Date,
        required: false,
        default: Date.now
    }
},
{
    toJSON: {
        virtuals: true,
    }
})

module.exports = IncomeSchema;