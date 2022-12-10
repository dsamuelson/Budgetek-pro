const { gql } = require('apollo-server-express')

const typeDefs = gql`
    type UOME {
        _id: ID
        uomeTitle: String
        uomeValue: String
        uomePaid: Boolean
    }

    input UOMEi {
        uomeTitle: String!
        uomeValue: String!
        uomePaid: Boolean
    }

    type IOU {
        _id: ID
        iouTitle: String
        iouValue: String
        iouPaid: Boolean
    }

    input IOUi {
        iouTitle: String!
        iouValue: String!
        iouPaid: Boolean
    }

    type incomeFrequencyt {
        _id: ID
        frequency: String
        isSameDay: String
        countWeekends: String
        hasCustom: Boolean
        nValue: String
        nUnit: String
        day: String
        month: String
    }

    input incomeFrequencyi {
        frequency: String
        isSameDay: String
        countWeekends: String
        hasCustom: Boolean
        nValue: String
        nUnit: String
        day: String
        month: String
    }

    type expenseFrequencyt {
        _id: ID
        frequency: String
        isSameDay: String
        countWeekends: String
        hasCustom: Boolean
        nValue: String
        nUnit: String
        day: String
        month: String
    }

    input expenseFrequencyi {
        frequency: String
        isSameDay: String
        countWeekends: String
        hasCustom: Boolean
        nValue: String
        nUnit: String
        day: String
        month: String
    }

    type Incomes {
        _id: ID
        incomeTitle: String
        incomeValue: String
        incomeInterest: String
        incomeFrequency: [incomeFrequencyt]
        primaryIncome: Boolean
        payDay: String
        uomePayInfo: [UOME]
    }

    type Expenses {
        _id: ID
        expenseTitle: String
        expenseValue: String
        expenseFrequency: [expenseFrequencyt]
        vitalExpense: Boolean
        expenseCategory: String
        totalExpenseValue: String
        expenseAPR: String
        dueDate: String
        iouInfo: [IOU]

    }

    type histEventt {
        _id: ID
        histID: String
        histTitle: String
        histType: String
        histValue: String
        histCategory: String
        histDates: [String]
    }

    type BankAccounts {
        _id: ID
        bankName: String
        accountIdentifier: String
        checkingValue: String
        savingsAccount: Boolean
        savingsValue: String
    }

    type User {
        _id: ID
        username: String
        email: String
        incomes: [Incomes]
        expenses: [Expenses]
        histEvents: [histEventt]
        bankAccounts: [BankAccounts]
        totalExpense: String
        totalIncome: String
        totalDebt: String
    }
    type Auth {
        token: ID!
        user: User
    }
    type Query {
        me: User
        getSingleUser(username: String!): User
        getAllUsers: [User]
        user: User
    }
    type Mutation {
        createUser(email: String!, username: String!, password: String!): Auth
        login(username: String! password: String!): Auth
        addIncome(incomeTitle: String!, incomeValue: String!, incomeInterest: String, incomeFrequency: [incomeFrequencyi]!, primaryIncome: Boolean!, payDay: String, uomePayInfo: [UOMEi!]): User
        updateIncome(_id: String!, incomeTitle: String, incomeValue: String, incomeInterest: String, primaryIncome: Boolean, payDay: String): User
        removeIncome(_id: String!): User
        addHistEvents(histID: String!, histTitle: String!, histType: String!, histValue: String!, histCategory: String, histDates: [String!]): User
        updateHistEvents(_id: String, histID: String!, histType: String, histTitle: String, histValue: String, histCategory: String, histDates: [String!]): User
        removeHistEvent(_id: String!): User
        addUOMe(uomeId: String!, uomePayInfo: [UOMEi!]!): User
        removeUOMe(_id: String!, incomeId: String!): User
        addExpense(expenseTitle: String!, expenseValue: String!, expenseFrequency: [expenseFrequencyi]!, vitalExpense: Boolean, expenseCategory: String, totalExpenseValue: String, expenseAPR: String, dueDate: String, iouInfo: [IOUi!]): User
        updateExpense(_id: String!, expenseTitle: String, expenseValue: String, vitalExpense: Boolean, expenseCategory: String, totalExpenseValue: String, expenseAPR: String, dueDate: String): User
        removeExpense(_id: String!): User
        addIOU(iouId: String!, iouInfo: [IOUi!]!): User
        removeIOU(_id: String!, expenseId: String!): User
        addBankAccount(bankName: String!, accountIdentifier: String!, checkingValue: String!, savingsAccount: Boolean, savingsValue:String): BankAccounts
    }
`;

module.exports = typeDefs