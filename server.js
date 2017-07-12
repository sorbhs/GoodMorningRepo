var express = require('express');
var builder = require('botbuilder');
var server = express();

server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('Server is listening..');
});

// setup bot credentials
var chatConnector = new builder.ChatConnector({
    appId:"f7a635cc-9266-429e-9970-9f0098c051ca",
    appPassword:"5kmOEq5SonkO2MMMgve40Xq"
});

var bot = new builder.UniversalBot(chatConnector);

// send simple notification
function sendProactiveMessage(address) {
  var msg = new builder.Message().address(address);
  msg.text('Hello, this is a notification');
  msg.textLocale('en-US');
  bot.send(msg);
}

var savedAddress;
server.post('/api/messages', chatConnector.listen());

// Do GET this endpoint to delivey a notification
server.get('/api/CustomWebApi', (req, res, next) => {
    sendProactiveMessage(savedAddress);
    res.send('triggered');
    next();
  }
);

// root dialog
bot.dialog('/', function(session, args) {

  savedAddress = session.message.address;

  var message = savedAddress+'Hello! In a few seconds I\'ll send you a message proactively to demonstrate how bots can initiate messages.';
  session.send(message);
  
  message = 'You can also make me send a message by accessing: ';
  message += 'http://localhost:' + server.address().port + '/api/CustomWebApi';
  session.send(message);

  setTimeout(() => {
   sendProactiveMessage(savedAddress);
  }, 5000);
});