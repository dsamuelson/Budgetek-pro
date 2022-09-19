const { Schema } = require('mongoose');

const ExpenseSchema = new Schema({
    expenseTitle: {
        type: String,
        required: true
    },
    expenseValue: {
        type: String,
        required: true
    },
    expenseFrequency: {
        type: String,
        required: true
    },
    vitalExpense: {
        type: Boolean,
        required: false
    },
    expenseCategory: {
        type: String,
        required: false
    },
    dueDate: {
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

module.exports = ExpenseSchema;