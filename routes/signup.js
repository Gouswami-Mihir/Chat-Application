var express = require('express');
var router = express.Router();
var path = require('path');
var Mongoconnection = require('../utilities/connection');
var constants = require('../utilities/constants');
var usermodel = require('../models/users.model');
// var multerfun = require('../utilities/multer');


var multer = require('multer');
var storage = multer.diskStorage({
    destination:function(req, file, cb){
        cb(null, path.join(__dirname,'../public/images'))
    },
    filename:function(req, file, cb){
        const name = Date.now()+'-'+file.originalname;
        cb(null,name);
    }
});
var upload = multer({ storage:storage});



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('signup', { title: 'Express' });
});

router.post('/',upload.single('image'), async (req, res) => {
    let primary = Mongoconnection.useDb(constants.DATABASE);
    let newuser = await primary.model(constants.MODEL.users, usermodel).create({
        name: req.body.name,
        email: req.body.email,
        image: 'images/'+req.file.filename,
        password:req.body.password
    });
    res.render('signup',{title:'express'});
});
module.exports = router;
