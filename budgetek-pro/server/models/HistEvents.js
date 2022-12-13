const { Schema } = require('mongoose');

const HistEvents = new Schema ({
    histID: {
        type: String,
        required: true
    },
    histType: {
        type: String,
        required: true
    },
    histTitle: {
        type: String,
        required: true
    },
    histValue: {
        type: Number,
        required: true
    },
    histCategory: {
        type: String,
        required: false,
    },
    histDate: {
        type: String,
        required: true
    }
},
{
    toJSON: {
        virtuals: true,
    }
})

module.exports = HistEvents;