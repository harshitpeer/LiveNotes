const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

io.on('connection', (socket) => { 
    socket.on('newUserRoom', roomID => {
        socket.join(roomID, () => {
            socket.to(roomID).emit('newUser');
        })
    })
    socket.on('sendText', (id, data) => {
        socket.to(id).emit('receiveText', data);
    })
});

http.listen(port, () => console.log('listening on port ' + port));