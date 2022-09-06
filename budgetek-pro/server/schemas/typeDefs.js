const { gql } = require('apollo-server-express')

const typeDefs = gql`
    type Incomes {
        _id: ID
        incomeTitle: String
        incomeValue: String
        incomeFrequency: String
        primaryIncome: Boolean
        payDay: Date
    }

    type Expenses {
        _id: ID
        expenseTitle: String
        expenseValue: String
        expenseFrequency: String
        vitalExpense: Boolean
        expenseCategory: String
        dueDate: Date

    }

    type User {
        _id: ID
        username: String
        email: String
        incomes: [Incomes]
        expenses: [Expenses]
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
        login(email: String!, password: String!): Auth
        addIncome(incomeTitle: String!, incomeValue: String!, incomeFrequency: String!, primaryIncome: Boolean!, payDay: Date)
        addExpense(expenseTitle: String!, expenseValue: String!, expenseFrequency: String!, vitalExpense: Boolean, expenseCategory: String, dueDate: Date)
    }
`;

module.exports = typeDefs