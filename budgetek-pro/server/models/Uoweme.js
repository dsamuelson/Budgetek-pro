const { Schema } = require('mongoose');

const UOMESchema = new Schema ({
    uomeTitle: {
        type: String,
        required: true
    },
    uomeValue: {
        type: Number,
        required: true
    },
    uomePaid: {
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

module.exports = UOMESchema;