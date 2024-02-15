var express = require('express');
var router = express.Router();
var Mongoconnection = require('../utilities/connection');
var constants = require('../utilities/constants');
var usermodel = require('../models/users.model');


/* GET home page. */
router.get('/', async(req, res, next) => {
  let primary = Mongoconnection.useDb(constants.DATABASE);
  console.log(req.session.user);
  var loginuserid = req.session.user[0]._id;
  console.log(loginuserid);
  let cheakExisting =  await primary.model(constants.MODEL.users, usermodel).find({ _id: { $nin:[loginuserid] } });
  res.render('dashboard',{user:req.session.user,users:cheakExisting });
});



module.exports = router;
