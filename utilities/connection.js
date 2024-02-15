var mongoose = require('mongoose');
var MongoDB = mongoose.createConnection(process.env.MONGO_URI,{
    useNewUrlParser : true,
    useUnifiedTopology : true
});
module.exports = MongoDB;