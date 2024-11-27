const net = require('net');
const { log } = require('./utils/logger');


const PORT = process.env.PORT || 3000;

const handleNewConnection = (socket) => {
  log('A new client connected');
  socket.write('Welcome to the chat server!\n');
};

const server = net.createServer(handleNewConnection);


server.listen(PORT, '0.0.0.0', () => {
  log(`Server is running on port ${PORT}`);
});
