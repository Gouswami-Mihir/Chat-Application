var mongoose = require('mongoose');
var schema = new mongoose.Schema({
   sender_id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'users'
   },
   receiver_id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'users'
   },
   message:{
    type:String,
    require:true
   }
},{timestamps: true, strict:false,autoIndex:true});
module.exports = schema;