const { Schema } = require('mongoose');
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
    eventFrequency: {
        frequency: {
            type: String,
            required: true,
            default: 'once'
        },
        isSameDay: {
            type: String,
            required: false,
        },
        countWeekends: {
            type: String,
            required: false,
            default: 'ignore'
        },
        hasCustom: {
            type: Boolean,
            required: false,
            default: false
        },
        nValue: {
            type: String,
            required: false
        },
        nUnit: {
            type: String,
            required: false
        },
        day: {
            type: String,
            required: false
        },
        month: {
            type: String,
            required: false
        }
    },
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