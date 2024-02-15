var express = require('express');
var router = express.Router();
var Mongoconnection = require('../utilities/connection');
var constants = require('../utilities/constants');
var usermodel = require('../models/users.model');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

router.post('/', async (req, res) => {
  let primary = Mongoconnection.useDb(constants.DATABASE);
  let cheakExisting = await primary.model(constants.MODEL.users, usermodel).find({email:req.body.email}).lean();
  console.log(cheakExisting);
  if(cheakExisting != null){
    req.session.user = cheakExisting;
    res.redirect("/dashboard");
  }else{
    res.redirect("/");
  }
});

module.exports = router;
