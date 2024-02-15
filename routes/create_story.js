// var express = require('express');
// var router = express.Router();
// var multer = require('../utilities/multer');
// var Mongoconnection = require('../utilities/connection');
// var constants = require('../utilities/constants');
// var storymodel = require('../models/story.model');
// var usermodel = require('../models/users.model');

// router.get('/', (req, res) => {
//     res.render('story', {title: 'express'});
// });

// router.post('/', multer.upload.single('image'), async (req, res) => {
//     if(Object.keys(req.body).length > 0){
//         let primary = Mongoconnection.useDb(constants.DATABASE);
//         let storysave = await primary.model(constants.MODEL.story, storymodel).create({
//             Image : 'images/'+ req.file.filename,
//             createBy: new mongoose.Types.ObjectId('653f9c30452362af1176df56')
//         });
//         res.status(200).json({message: "story create successfully...."});
//     }else{
//         res.status(400).json({message:'invalid data to create story, please try again with valid data'})
//     }
// });


// router.post('/show_story', async (req, res) => {
//     let primary = Mongoconnection.useDb(constants.DATABASE);
//     let checkExisting = await primary.model(constants.MODEL.story, storymodel).find({})
//     .populate({path: "createBy", model: primary.model(constants.MODEL.users, usermodel), select:"name email image "});

//     res.status(200).json({checkExisting});
// })

// module.exports = router;
 