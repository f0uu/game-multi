var express = require('express');
var app = express();

var players = [];
var lasers = [];
var indexClient = 0;

function Player(id, x, y, angle, r, name) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.r = r;
    this.name = name
}

function Laser(id, x, y, velX, velY, angle) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.velX = velX;
    this.velY = velY;
    this.offScreen = false;
}

function updateLasers() {
    for (var i = 0; i < lasers.length; i++) {
        var l = lasers[i];
        l.x += l.velX;
        l.y += l.velY;
    }
}

var server = app.listen(3000);
app.use(express.static('public'));

console.log("henlo, my server is workin out at gym");

var socket = require('socket.io');
var io = socket(server);

setInterval(send, 10);

function send() {
    io.sockets.emit('player', players);
    updateLasers();
    io.sockets.emit('laser', lasers);
}



io.sockets.on('connection', function (socket) {

    console.log("New client no. " + indexClient + ": " + socket.id);
    indexClient++;

    socket.on('start', function (data) {
        var player = new Player(socket.id, data.x, data.y, data.angle, data.r, indexClient);
        players.push(player);
    });

    socket.on('updatePlayer', function (dataPlayer) {
        var p;

        for (var i = 0; i < players.length; i++) {
            if (socket.id == players[i].id) p = players[i];
        }

        p.x = dataPlayer.x;
        p.y = dataPlayer.y;
        p.angle = dataPlayer.angle;
        p.r = dataPlayer.r;
    });


    socket.on('laserRecive', function (data) {
        var laser = new Laser(socket.id, data.x, data.y, data.velX, data.velY, data.angle);
        lasers.push(laser);
    });


});