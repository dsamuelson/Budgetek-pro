const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const BankSchema = require('./Banks');
const HistEventsSchema = require('./HistEvents');
const BudgetEventSchema = require('./BudgetEvents');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\../, 'Must use a valid email address']
        },
        password: {
            type: String,
            required: true,
        },
        budgetEvents: [BudgetEventSchema],
        histEvents: [HistEventsSchema],
        bankAccounts: [BankSchema]
    },
    {
        toJSON: {
            virtuals: true,
        }
    }
);

userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
});

userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

userSchema.virtual('totalExpense').get(function() {
    let tExpense = 0;
    for (let i = 0; i < this.budgetEvents.length; i ++) {
        if (this.budgetEvents[i].eventType === 'expense'){
            tExpense += parseFloat(this.budgetEvents[i].eventValue)
        }
    }
    return tExpense.toFixed(2);
});

userSchema.virtual('totalDebt').get(function() {
    let tDebt = 0;
    for (let i = 0; i < this.budgetEvents.length; i ++) {
        if (this.budgetEvents[i].eventType === 'expense'){
            if (this.budgetEvents[i].totalEventValue) {
                tDebt += parseFloat(this.budgetEvents[i].totalEventValue)
            } 
        }
    }
    return tDebt.toFixed(2);
});

userSchema.virtual('totalIncome').get(function() {
    let tIncome = 0;
    for (let i = 0; i < this.budgetEvents.length; i ++) {
        if (this.budgetEvents[i].eventType === 'income')
        tIncome += parseFloat(this.budgetEvents[i].eventValue)
    }
    return tIncome.toFixed(2);
});

const User = model('User', userSchema);

module.exports = User;