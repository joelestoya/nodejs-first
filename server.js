const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const serverIp = '192.168.137.1'; // Replace with your local IP address

http.listen(3000, serverIp, () => {
    console.log(`Server is running on http://${serverIp}:3000`);
  });


app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

http.listen(3000, () => {
  console.log('Server is running on http://192.168.137.1:3000');
});
