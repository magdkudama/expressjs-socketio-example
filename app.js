var express = require('express')
  , http = require('http')
  , app = express();

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'hbs');
});

app.get('/', function(req, res){
    res.render('index');
});

var server = app.listen(3000);

var io = require('socket.io').listen(server);
var count = 0;
io.sockets.on('connection', function(socket) {
  socket.emit('mensajeCantidadPulsaciones', count);
  socket.on('pulsacion', function() {
    count++;
    io.sockets.emit('mensajeCantidadPulsaciones', count);
  });
});