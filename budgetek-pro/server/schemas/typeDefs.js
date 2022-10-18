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

    type Incomes {
        _id: ID
        incomeTitle: String
        incomeValue: String
        incomeFrequency: String
        primaryIncome: Boolean
        payDay: String
        uomePayInfo: [UOME]
    }

    type Expenses {
        _id: ID
        expenseTitle: String
        expenseValue: String
        expenseFrequency: String
        vitalExpense: Boolean
        expenseCategory: String
        dueDate: String
        iouInfo: [IOU]

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
        totalExpense: String
        totalIncome: String
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
        addIncome(incomeTitle: String!, incomeValue: String!, incomeFrequency: String!, primaryIncome: Boolean!, payDay: String, uomePayInfo: [UOMEi!]): User
        removeIncome(_id: String!): User
        addUOMe(uomeId: String!, uomePayInfo: [UOMEi!]!): User
        removeUOMe(_id: String!, incomeId: String!): User
        addExpense(expenseTitle: String!, expenseValue: String!, expenseFrequency: String!, vitalExpense: Boolean, expenseCategory: String, dueDate: String, iouInfo: [IOUi!]): User
        removeExpense(_id: String!): User
        addIOU(iouId: String!, iouInfo: [IOUi!]!): User
        removeIOU(_id: String!, expenseId: String!): User
        addBankAccount(bankName: String!, accountIdentifier: String!, checkingValue: String!, savingsAccount: Boolean, savingsValue:String): BankAccounts
    }
`;

module.exports = typeDefs