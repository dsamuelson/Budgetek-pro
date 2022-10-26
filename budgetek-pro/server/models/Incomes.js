const { Schema } = require('mongoose');
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
    incomeFrequency: [{
        frequency: {
            type: String,
            required: true
        },
        isSameDay: {
            type: String,
            required: false
        },
        day: {
            type: String,
            required: false
        },
        month: {
            type: String,
            required: false
        }
    }],
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