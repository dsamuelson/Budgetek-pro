const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

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

userSchema.virtual('monthlyCatagoryDebt').get(function() {
    let expensesEvents = this.budgetEvents.filter(bEvent => {return bEvent.eventType === 'expense'})
    let expenseArr = []
    for (let i = 0; i < expensesEvents.length ; i ++) {
        expenseArr.push({expenseCatagory: expensesEvents[i].eventCategory, expenseValue: parseFloat(expensesEvents[i].eventValue)})
    }
    
    let catagoryDebt = expenseArr.reduce((c, v) => {
        c[v.expenseCatagory] = (c[v.expenseCatagory] || 0) + parseFloat(v.expenseValue);
        return c;
      }, {});
    return catagoryDebt;
});

userSchema.virtual('debtTotalperCatagory').get(function() {
    let expensesEvents = this.budgetEvents.filter(bEvent => {return bEvent.eventType === 'expense'})
    let expenseArr = []
    for (let i = 0; i < expensesEvents.length ; i ++) {
        expenseArr.push({expenseCatagory: expensesEvents[i].eventCategory, expenseValue: parseFloat(expensesEvents[i].totalEventValue || 0.00)})
    }
    
    let totalCategoryDebt = expenseArr.reduce((c, v) => {
        c[v.expenseCatagory] = (c[v.expenseCatagory] || 0) + parseFloat(v.expenseValue);
        return c;
      }, {});
    
    return totalCategoryDebt;
});

userSchema.virtual('monthlyCatagoryIncome').get(function() {
    let incomesEvents = this.budgetEvents.filter(bEvent => {return bEvent.eventType === 'income'})
    let incomeArr = []
    for (let i = 0; i < incomesEvents.length ; i ++) {
        incomeArr.push({incomeCatagory: incomesEvents[i].eventCategory, incomeValue: parseFloat(incomesEvents[i].eventValue)})
    }
    
    let catagoryIncome = incomeArr.reduce((c, v) => {
        c[v.incomeCatagory] = (c[v.incomeCatagory] || 0) + parseFloat(v.incomeValue);
        return c;
      }, {});
    return catagoryIncome;
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