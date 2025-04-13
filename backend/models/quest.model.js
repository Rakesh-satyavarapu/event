const mongoose = require('mongoose')
let PostSchema = mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,
    ref:'student'},
    quest:String,
},{timestamps:true})

let post = mongoose.model('QuestPost',PostSchema)
module.exports = post