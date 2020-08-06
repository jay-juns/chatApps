const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

const PORT = process.env.PORT || 5000;

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());
app.use(router);

io.on('connect', (socket) => {
	socket.on('join', ({ name, room }, callback) => {
		const { error, user } = addUser({ id: socket.id, name, room });

    if(error) return callback(error);
    
    socket.join(user.room);

		socket.emit('message', { user: 'admin', text: `${user.name}님, ${user.room}에 오신 걸 환영합니다.` });	
		socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name}님이 입장하셨습니다.`});
    
    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)})

		callback();
	});

	socket.on('sendMessage', (message, callback) => {
		const user = getUser(socket.id);

    io.to(user.room).emit('message', { user: user.name, text: message });
    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

		callback();
	});

	socket.on('disconnect', () => {
    const user = removeUser(socket.id);
    
    if(user){
      io.to(user.room).emit('message', { user: 'admin', text: `${user.name}가 나갔습니다.`})
    }
	})
});

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));