const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const ExpenseSchema = require('./Expenses')
const IncomeSchema = require('./Incomes')
const BankSchema = require('./Banks');
const HistEvents = require('./HistEvents');

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
        incomes: [IncomeSchema],
        expenses: [ExpenseSchema],
        histEvents: [HistEvents],
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
    for (let i = 0; i < this.expenses.length; i ++) {
        tExpense += parseFloat(this.expenses[i].expenseValue)
    }
    return tExpense.toFixed(2);
});

userSchema.virtual('totalDebt').get(function() {
    let tDebt = 0;
    for (let i = 0; i < this.expenses.length; i ++) {
        if (this.expenses[i].totalExpenseValue) {
        tDebt += parseFloat(this.expenses[i].totalExpenseValue)
    }
    }
    return tDebt.toFixed(2);
});

userSchema.virtual('totalIncome').get(function() {
    let tIncome = 0;
    for (let i = 0; i < this.incomes.length; i ++) {
        tIncome += parseFloat(this.incomes[i].incomeValue)
    }
    return tIncome.toFixed(2);
});

const User = model('User', userSchema);

module.exports = User;