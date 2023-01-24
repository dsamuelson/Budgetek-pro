const { gql } = require('apollo-server-express')

const typeDefs = gql`
    scalar JSON

    type HistIOU {
        _id: ID
        iouTitle: String
        iouValue: String
        iouPaid: Boolean
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

    type eventFrequencyt {
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

    input histEventFrequencyi {
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
        eventFrequency: eventFrequencyt
        vitalEvent: Boolean
        eventCategory: String
        totalEventValue: String
        eventAPR: String
        eventDate: String
        iouInfo: [IOU]
    }

    type HistEventsT {
        _id: ID
        histID: String
        eventID: String
        histTitle: String
        histValue: String
        histType: String
        histFrequency: eventFrequencyt
        histVitalEvent: Boolean
        histCategory: String
        totalHistEventValue: String
        histAPR: String
        histDate: String
        histIOUInfo: [HistIOU]
    }

    type User {
        _id: ID
        username: String
        email: String
        budgetEvents: [BudgetEventsT]
        histEvents: [HistEventsT]
        totalExpense: String
        totalIncome: String
        totalDebt: String
        monthlyCatagoryDebt: JSON
        debtTotalperCatagory: JSON
        monthlyCatagoryIncome: JSON
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
        addBudgetEvent(eventTitle: String!, eventValue: String!, eventType: String!, eventFrequency: eventFrequencyi, vitalEvent: Boolean, eventCategory: String, totalEventValue: String, eventAPR: String, eventDate: String, iouInfo: [IOUi!]): User
        addIOU(iouId: String!, iouInfo: [IOUi!]!): User
        updateBudgetEvent(_id: String!, eventTitle: String, eventValue: String, eventType: String, vitalEvent: Boolean, eventCategory: String, totalEventValue: String, eventAPR: String, eventDate: String): User
        removeBudgetEvent(_id: String!): User
        removeIOU(_id: String!, eventId: String!): User
        addHistEvent(histID: String!, eventID: String!, eventTitle: String!, eventValue: String!, eventType: String!, eventFrequency: eventFrequencyi, vitalEvent: Boolean, eventCategory: String, totalEventValue: String, eventAPR: String, eventDate: String, iouInfo: [IOUi!]): User
        updateHistEvent(_id: String, histID: String!, histType: String, histTitle: String, histValue: String, histCategory: String, histDate: String): User
        removeHistEvent(histID: String, _id: String): User
        rsUdata: User
        rsBEdata: User
        rsHEdata: User
        rsBAdata: User
    }
`;

module.exports = typeDefs