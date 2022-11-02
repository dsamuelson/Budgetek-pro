const { Schema } = require('mongoose');

const DDBreakdownSchema = new Schema ({
    frequency: {
        type: String,
        required: true
    },
    isSameDay: {
        type: String,
        required: false
    },
    countWeekends: {
        type: String,
        required: false
    },
    hasCustom: {
        type: Boolean,
        required: false
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

module.exports = DDBreakdownSchema;