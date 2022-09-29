const { Schema } = require('mongoose');

const BankSchema = new Schema({
    bankName: {
        type: String,
        required: true
    },
    accountIdentifier: {
        type: String,
        required: true
    },
    checkingValue: {
        type: String,
        required: true
    },
    savingsAccount: {
        type: Boolean,
        required: false
    },
    savingsValue: {
        type: String,
        required: false
    }
    
},
{
    toJSON: {
        virtuals: true,
    }
});

module.exports = BankSchema;