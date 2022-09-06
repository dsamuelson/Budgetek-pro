const { Schema } = require('mongoose');

const IncomeSchema = new Schema ({
    incomeTitle: {
        type: String,
        required: true
    },
    incomeValue: {
        type: String,
        required: true
    },
    incomeFrequency: {
        type: String,
        required: true
    },
    primaryIncome: {
        type: Boolean,
        required: true,
    },
    payDay: {
        type: Date,
        required: false,
        default: Date.now
    }
})

module.exports = IncomeSchema;