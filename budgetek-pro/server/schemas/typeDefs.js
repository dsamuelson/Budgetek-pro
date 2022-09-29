const { gql } = require('apollo-server-express')

const typeDefs = gql`
    type Incomes {
        _id: ID
        incomeTitle: String
        incomeValue: String
        incomeFrequency: String
        primaryIncome: Boolean
        payDay: String
    }

    type Expenses {
        _id: ID
        expenseTitle: String
        expenseValue: String
        expenseFrequency: String
        vitalExpense: Boolean
        expenseCategory: String
        dueDate: String

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
        bankAccounts: [BankAccounts]
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
        addIncome(incomeTitle: String!, incomeValue: String!, incomeFrequency: String!, primaryIncome: Boolean!, payDay: String): Incomes
        addExpense(expenseTitle: String!, expenseValue: String!, expenseFrequency: String!, vitalExpense: Boolean, expenseCategory: String, dueDate: String): Expenses
        addBankAccount(bankName: String!, accountIdentifier: String!, checkingValue: String!, savingsAccount: Boolean, savingsValue:String): BankAccounts
    }
`;

module.exports = typeDefs