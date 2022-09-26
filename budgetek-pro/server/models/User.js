const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const ExpenseSchema = require('./Expenses')
const IncomeSchema = require('./Incomes')

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
        expenses: [ExpenseSchema]
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
    return this.expenses.length;
});

userSchema.virtual('totalIncome').get(function() {
    return this.incomes.length;
})

const User = model('User', userSchema);

module.exports = User;