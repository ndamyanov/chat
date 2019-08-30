var http = require('http');
var express = require('express');

var app = express();

server = app.listen(3000);

app.set('view engine', 'ejs');

app.use(express.static('public'))

const io = require('socket.io')(server);

io.on('connection', (socket) => {
	console.log('new user connected')
	socket.username = 'Anonymous'
	
	socket.on('change_username', (data) => {
		socket.username = data.username
	})
	
	socket.on('change_userimage', (data) => {
		socket.userimage = data.userimage
	})
	
	socket.on('new_message', (data) => {
		io.sockets.emit('new_message', {message : data.message, username : socket.username, userimage : socket.userimage});	
	})
})



app.get('/', (req, res)=> {
	//res.write('Hello Niki, well done!');
	res.render('index')
})

//http.createServer(function (req, res) {
 // res.writeHead(200, {'Content-Type': 'text/html'});
 // res.write('Hello Niki, well done!');
 // res.end();
//}).listen(8080);

