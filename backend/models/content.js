const mongoose = require('mongoose')
const contentSchema = mongoose.Schema({
    Title: {
        type: String,
        required: true
    }
    ,
    content: { type: Array, default: [] },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },

})
const content = mongoose.model('content', contentSchema)
module.exports = content