const mongoose = require('mongoose')
const contentSchema = mongoose.Schema({
    Title:{
type:String,
required: True
    }
    ,
    content:{
        type:String,
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    
})
const content = mongoose.model('content',contentSchema)
module.exports = content