const net = require('net');
const { log } = require('./utils/logger');

const PORT = process.env.PORT || 3000; // Use Render's PORT or fallback to 3000 for local testing

// Store connected clients and their names
const clients = new Map();

const broadcastMessage = (sender, message) => {
  for (const [socket, name] of clients.entries()) {
    if (socket !== sender) {
      socket.write(`${name}: ${message}`);
    }
  }
};

const handleNewConnection = (socket) => {
  log('A new client connected');
  socket.write('Enter your name: ');

  let clientName = '';

  socket.on('data', (data) => {
    const message = data.toString().trim();

    if (!clientName) {
      clientName = message;
      clients.set(socket, clientName);
      log(`${clientName} has joined the chat`);
      socket.write(`Welcome, ${clientName}!\n`);
      broadcastMessage(socket, `${clientName} has joined the chat\n`);
    } else {
      log(`${clientName}: ${message}`);
      broadcastMessage(socket, `${message}\n`);
    }
  });

  socket.on('error', (err) => {
    log(`Socket error: ${err.message}`);
  });

  socket.on('close', () => {
    log(`${clientName} disconnected`);
    clients.delete(socket);
    broadcastMessage(socket, `${clientName} has left the chat\n`);
  });
};

const server = net.createServer(handleNewConnection);

server.listen(PORT, '0.0.0.0', () => {
  log(`Server is running on port ${PORT}`);
});
