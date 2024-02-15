var Mongoconnection = require('../utilities/connection');
var constants = require('../utilities/constants');
var usermodel = require('../models/users.model');
var chatmodel = require('../models/chat.model');

const io = require("socket.io")({
    cors: {
        origin: "*"
    }
});
const socketapi = { io: io };

var usp = io.of('/user-namespace');

usp.on('connection', async (socket) => {
    console.log("user connected...");
    var userid = socket.handshake.auth.token;
    let primary = Mongoconnection.useDb(constants.DATABASE);
    let cheakExisting = await primary.model(constants.MODEL.users, usermodel).findByIdAndUpdate(userid, { is_online: '1' });

    // user brodcast online status
    socket.broadcast.emit('getOnlineuser', { user_id: userid });

     
    socket.on('disconnect', async () => {
        var userid = socket.handshake.auth.token;
        let primary = Mongoconnection.useDb(constants.DATABASE);
        let cheakExisting = await primary.model(constants.MODEL.users, usermodel).findByIdAndUpdate(userid, { is_online: '0' });
        console.log("user disconnect" );

        // user brodcast offline status
        socket.broadcast.emit('getOfflineuser', { user_id: userid });

    });
     
    // chatting socket
    socket.on('newChat', (data) => {
        socket.broadcast.emit('loadNewChat', data);
    });

    //load old chats
    socket.on('existChat', async (data) => {
        let primary = Mongoconnection.useDb(constants.DATABASE);
        let cheakExisting = await primary.model(constants.MODEL.chats, chatmodel).find({
            $or: [
                { sender_id: data.sender_id, receiver_id: data.receiver_id },
                { sender_id: data.receiver_id, receiver_id: data.sender_id }
            ]
        });
        socket.emit('loadchats', { chats: cheakExisting });
    })
     

});

module.exports.server = socketapi;