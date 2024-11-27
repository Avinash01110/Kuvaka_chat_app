const net = require("net");
const { log, errorLog } = require("../utils/logger");
const chatService = require("../services/chatService");
const { HOST, PORT } = require("../config");

// Handle a new client connection
const handleNewConnection = (socket) => {
  log("A new client connected");
  chatService.addClient(socket);

  socket.write("Welcome! Please enter your name: ");

  let isNameSet = false;

  socket.on("data", (data) => {
    const message = data.toString().trim();

    if (!isNameSet) {
      chatService.setUsername(socket, message);
      isNameSet = true;
      socket.write(`Welcome, ${message}! You can now start chatting.\n`);
      return;
    }

    log(`Message received from ${chatService.getUsername(socket)}: ${message}`);
    chatService.broadcastMessage(socket, message);
  });

  socket.on("end", () => {
    log(`${chatService.getUsername(socket) || "A client"} disconnected`);
    chatService.removeClient(socket);
  });

  socket.on("error", (err) => {
    errorLog(`Socket error: ${err.message}`);
  });
};

// Start the TCP server for local development
const startTcpServer = () => {
  const server = net.createServer(handleNewConnection);

  server.listen(PORT, HOST, () => {
    log(`TCP server running at ${HOST}:${PORT}`);
  });
};

module.exports = { startTcpServer };
