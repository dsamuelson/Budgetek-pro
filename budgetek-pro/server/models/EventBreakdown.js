const { Schema } = require('mongoose');

const EventBreakdownSchema = new Schema ({
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
{
    toJSON: {
        virtuals: true,
    }
})

module.exports = EventBreakdownSchema;