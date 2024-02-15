var mongoose = require('mongoose');
var schema = new mongoose.Schema({
    name:{
        type: String,
        require:true
    },
    email:{
        type: String,
        require:true
    },
    image:{
        type: String,
        require:true
    },
    password:{
        type: String,
        require:true
    },
    is_online:{
        type: String,
        default:"0"
    },

},{timestamps: true, strict:false,autoIndex:true});
module.exports = schema;