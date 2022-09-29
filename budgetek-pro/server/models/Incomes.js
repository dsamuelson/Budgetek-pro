const { Schema } = require('mongoose');

const IncomeSchema = new Schema ({
    incomeTitle: {
        type: String,
        required: true
    },
    incomeValue: {
        type: Number,
        required: true
    },
    incomeFrequency: {
        type: String,
        required: true
    },
    primaryIncome: {
        type: Boolean,
        required: true,
        default: false
    },
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