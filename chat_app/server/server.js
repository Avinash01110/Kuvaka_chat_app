const net = require("net");
const http = require("http");

const TCP_PORT = 10000; // TCP Chat Port
const HTTP_PORT = 8080; // HTTP Health Check Port

// Store clients
const clients = [];

// TCP Server for Chat
const tcpServer = net.createServer((socket) => {
  console.log("A new client connected");
  socket.write("Welcome to the chat server!\n");

  socket.on("data", (data) => {
    const message = data.toString().trim();
    console.log(`Message received: ${message}`);

    // Broadcast to all other clients
    clients.forEach((client) => {
      if (client !== socket) client.write(message + "\n");
    });
  });

  socket.on("end", () => {
    console.log("A client disconnected");
    clients.splice(clients.indexOf(socket), 1);
  });

  socket.on("error", (err) => console.error("Socket error:", err));

  clients.push(socket);
});

// Start TCP Server
tcpServer.listen(TCP_PORT, () => {
  console.log(`TCP Chat Server is running on port ${TCP_PORT}`);
});

// HTTP Server for Health Checks
const httpServer = http.createServer((req, res) => {
  if (req.url === "/health") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("OK");
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

// Start HTTP Server
httpServer.listen(HTTP_PORT, () => {
  console.log(`HTTP Health Check Server is running on port ${HTTP_PORT}`);
});
