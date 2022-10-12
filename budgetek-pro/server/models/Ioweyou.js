const { Schema } = require('mongoose');

const IOWEUSchema = new Schema ({
    iouTitle: {
        type: String,
        required: true
    },
    iouValue: {
        type: Number,
        required: true
    },
    iouPaid: {
        type: Boolean,
        required: false,
        default: false
    }
},
{
    toJSON: {
        virtuals: true,
    }
})

module.exports = IOWEUSchema;