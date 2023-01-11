const { gql } = require('apollo-server-express')

const typeDefs = gql`

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

    type eventFrequencyt {
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

    input eventFrequencyi {
        frequency: String
        isSameDay: String
        countWeekends: String
        hasCustom: Boolean
        nValue: String
        nUnit: String
        day: String
        month: String
    }


    type BudgetEventsT {
        _id: ID
        eventTitle: String
        eventValue: String
        eventType: String
        eventFrequency: [eventFrequencyt]
        vitalEvent: Boolean
        eventCategory: String
        totalEventValue: String
        eventAPR: String
        eventDate: String
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
        budgetEvents: [BudgetEventsT]
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
        addHistEvents(histID: String!, histTitle: String!, histType: String!, histValue: String!, histCategory: String, histDate: String!): User
        updateHistEvents(_id: String, histID: String!, histType: String, histTitle: String, histValue: String, histCategory: String, histDate: String): User
        removeHistEvent(_id: String!): User
        addBudgetEvent(eventTitle: String!, eventValue: String!, eventType: String!, eventFrequency: [eventFrequencyi]!, vitalEvent: Boolean, eventCategory: String, totalEventValue: String, eventAPR: String, eventDate: String, iouInfo: [IOUi!]): User
        updateBudgetEvent(_id: String!, eventTitle: String, eventValue: String, eventType: String, vitalEvent: Boolean, eventCategory: String, totalEventValue: String, eventAPR: String, eventDate: String): User
        removeBudgetEvent(_id: String!): User
        addIOU(iouId: String!, iouInfo: [IOUi!]!): User
        removeIOU(_id: String!, eventId: String!): User
        addBankAccount(bankName: String!, accountIdentifier: String!, checkingValue: String!, savingsAccount: Boolean, savingsValue: String): BankAccounts
    }
`;

module.exports = typeDefs