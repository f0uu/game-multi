var express = require('express');
var app = express();

var players = [];
var lasers = [];
var index = 0;

function Player(id, x, y, angle, r, name) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.r = r;
    this.name = name
}

function Laser(id,x,y,angle, len) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.len = len;
}

var server = app.listen(3000);
app.use(express.static('public'));

console.log("henlo, my server is workin out at gym");

var socket = require('socket.io');
var io = socket(server);

setInterval(send, 33);

function send() {
    io.sockets.emit('player', players);
    io.sockets.emit('laser', lasers);
}



io.sockets.on('connection', function(socket) {

    console.log("New client no. " + index + ": " + socket.id);
    index++;

    socket.on('start', function(data) {
        var player = new Player(socket.id, data.x, data.y, data.angle, data.r, index);
        players.push(player);
    });

    socket.on('updatePlayer', function(dataPlayer) {
        var p;

        for(var i = 0; i < players.length; i++) {
            if(socket.id == players[i].id) p = players[i];
        }

        p.x = dataPlayer.x;
        p.y = dataPlayer.y;
        p.angle = dataPlayer.angle;
        p.r = dataPlayer.r;
    });


    socket.on('laserRecive', function(data) {
        var laser = new Laser(socket.id, data.x, data.y, data.angle, data.len);
        lasers.push(laser);
    });

    socket.on('updateLaser', function(dataLaser) {
        var l;
        for(var i = 0; i < lasers.length; i++) {
            if(socket.id == lasers[i].id) l = lasers[i];
        }
        l.x = dataLaser.x;
        l.y = dataLaser.y;
        l.angle = dataLaser.angle;

    });

});

