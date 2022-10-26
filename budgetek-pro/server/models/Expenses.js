const { Schema } = require('mongoose');
const IOWEUSchema = require('./Ioweyou');

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
    totalExpenseValue: {
        type: String,
        required: false
    },
    iouInfo: [IOWEUSchema],
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
});

module.exports = ExpenseSchema;