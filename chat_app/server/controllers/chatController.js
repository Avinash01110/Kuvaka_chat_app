const net = require("net");
const { log, errorLog } = require("../utils/logger");
const chatService = require("../services/chatService");
const { HOST, PORT } = require("../config");

// It handles a new client connection.
const handleNewConnection = (socket) => {
  log("A new client connected");
  chatService.addClient(socket);

  // Send a welcome message and prompt for the username
  socket.write("Welcome! Please enter your name: ");

  let isNameSet = false;

  // Event listener for receiving data from the client
  socket.on("data", (data) => {
    const message = data.toString().trim();

    if (!isNameSet) {
      chatService.setUsername(socket, message);
      isNameSet = true;
      socket.write(`Welcome, ${message}! You can now start chatting.\n`);
      return;
    }

    // Log and broadcast the received message
    log(`Message received from ${chatService.getUsername(socket)}: ${message}`);
    chatService.broadcastMessage(socket, message);
  });

  // Event listener for when the client disconnects
  socket.on("end", () => {
    log(`${chatService.getUsername(socket) || "A client"} disconnected`);
    chatService.removeClient(socket);
  });

  // Event listener for handling socket errors
  socket.on("error", (err) => {
    errorLog(`Socket error: ${err.message}`);
  });
};

// It starts the TCP server.
const startTcpServer = () => {
  // Create a TCP server and define the connection handler
  const server = net.createServer(handleNewConnection);

  // Start the server and listen on the specified host and port
  server.listen(PORT, HOST, () => {
    log(`TCP server running at ${HOST}:${PORT}`);
  });
};

module.exports = { startTcpServer };
