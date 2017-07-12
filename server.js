var express = require('express');
var builder = require('botbuilder');

var nlpModel = "https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/71e63b48-fba5-4dca-81d0-104e9332e55a?subscription-key=a1cc90607c97440bad93c1ef0336a7fa&timezoneOffset=0&verbose=true&q=";
var recognizer = new builder.LuisRecognizer(nlpModel);
var intent = new builder.IntentDialog({recognizers: [recognizer]});


var server = express();
var chatConnector = new builder.ChatConnector({
    appId:"f7a635cc-9266-429e-9970-9f0098c051ca",
    appPassword:"5kmOEq5SonkO2MMMgve40Xq"
});
var bot = new builder.UniversalBot(chatConnector);
bot.dialog('/',intent);


intent.matches('Greetings', function(session){
	session.send("Hello User!!");
});

intent.matches('introduction',function(session){
	session.send("My name is goodmorning bot!!");
});

intent.onDefault(builder.DialogAction.send("Sorry I dont know that"));

server.post('/api/messages', chatConnector.listen());
server.use('/', express.static('docs'));
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('Server is listening..');
});
