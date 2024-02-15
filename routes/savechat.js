var express = require('express');
var router = express.Router();
var Mongoconnection = require('../utilities/connection');
var constants = require('../utilities/constants');
var chatmodel = require('../models/chat.model');

/* GET users listing. */
router.post('/', async (req, res, next) => {
  try{
    let primary = Mongoconnection.useDb(constants.DATABASE);
    let save = await primary.model(constants.MODEL.chats, chatmodel).create({
        sender_id: req.body.sender_id,
        receiver_id: req.body.receiver_id,
        message: req.body.message
    });
    res.status(200).send({success:true, msg:'chat saved', data:save});
  }catch(error){
    res.status(400).send({success:false, msg:error.message});
  }
});

module.exports = router;
