const { Schema } = require('mongoose');
const IOWEUSchema = require('./Ioweyou')

const HistEventsSchema = new Schema ({
    histID: {
        type: String, 
        trim: true, 
        index: {
            unique: true,
            partialFilterExpression: {histID: {$type: "string"}}
          }
    },
    eventID: {
        type: String,
        required: true
    },
    histTitle: {
        type: String,
        required: true
    },
    histValue: {
        type: String,
        required: true
    },
    histType: {
        type: String,
        required: true,
    },
    histFrequency: {
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
    histVitalEvent: {
        type: Boolean,
        required: false,
        default: false
    },
    histCategory: {
        type: String,
        required: false,
    },
    totalHistEventValue: {
        type: String,
        required: false,
        default: "0"
    },
    histAPR: {
        type: String,
        required: false,
        default: "0"
    },
    histIOUInfo: [IOWEUSchema],
    histDate: {
        type: Date,
        required: false,
        default: Date.now()
    }
},
{
    toJSON: {
        virtuals: true,
    }
})

module.exports = HistEventsSchema;