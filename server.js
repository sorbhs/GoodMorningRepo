var express = require('express');
var builder = require('botbuilder');
var server = express();
var chatConnector = new builder.ChatConnector({
    appId: f7a635cc-9266-429e-9970-9f0098c051ca,
    appPassword: 5kmOEq5SonkO2MMMgve40Xq
});
var bot = new builder.UniversalBot(chatConnector);
bot.dialog('/', function(session){
    session.send("hello world");
});
server.post('/api/messages', chatConnector.listen());
server.use('/', express.static('docs'));
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('Server is listening..');
});
