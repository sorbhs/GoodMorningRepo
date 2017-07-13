var express = require('express');
var builder = require('botbuilder');
var cron = require('node-cron');
var server = express();

var bodyParser = require('body-parser'); 


var request = require("request");


server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('Server is listening..');
});

/*
var task = cron.schedule('* * * * *', function() {
  console.log('immediately started');
  request("https://goodmorning-app.herokuapp.com/api/CustomWebApi");
}, false);
 
task.start();
*/
// setup bot credentials
var chatConnector = new builder.ChatConnector({
    appId:"f7a635cc-9266-429e-9970-9f0098c051ca",
    appPassword:"5kmOEq5SonkO2MMMgve40Xq"
});

var bot = new builder.UniversalBot(chatConnector);

// send simple notification
function sendProactiveMessage(address,message) {
  var msg = new builder.Message().address(address);
  msg.text(message);
  msg.textLocale('en-US');
  bot.send(msg);
}

var savedAddress;
server.use(bodyParser.json());
server.post('/api/messages', chatConnector.listen());

// Do GET this endpoint to delivey a notification
server.post('/api/CustomWebApi', (req, res, next) => {
    savedAddress=req.body.add;
    message1=req.body.msg;
    console.log(savedAddress);

    sendProactiveMessage(savedAddress,message1);
    res.send('triggered');
    next();
  }
);

// root dialog
bot.dialog('/', function(session, args) {

  savedAddress = session.message.address;
  console.log(savedAddress);
  var message = 'Hello! In a few seconds I\'ll send you a message proactively to demonstrate how bots can initiate messages.';
  session.send(JSON.stringify(savedAddress));

   setTimeout(() => {
   sendProactiveMessage(savedAddress);
  }, 5000);
});