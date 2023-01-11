const { Schema } = require('mongoose');
const EventBreakdownSchema = require('./EventBreakdown')
const IOWEUSchema = require('./Ioweyou')

const BudgetEventSchema = new Schema({
    eventTitle: {
        type: String,
        required: true
    },
    eventValue: {
        type: String,
        required: true
    },
    eventType: {
        type: String,
        required: true,
        default: 'expense'
    },
    eventFrequency: [EventBreakdownSchema],
    vitalEvent: {
        type: Boolean,
        required: false
    },
    eventCategory: {
        type: String,
        required: false,
        default: "other"
    },
    totalEventValue: {
        type: String,
        required: false,
    },
    eventAPR: {
        type: String,
        required: false
    },
    iouInfo: [IOWEUSchema],
    eventDate: {
        type: Date,
        required: false,
        default: Date.now()
    }
    
},
{
    toJSON: {
        virtuals: true,
    }
});

module.exports = BudgetEventSchema;