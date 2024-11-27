const http = require("http");
const { startTcpServer } = require("./controllers/chatController");
const { log } = require("./utils/logger");

// Created an HTTP server to handle basic HTTP requests
const httpServer = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  // Respond with a message indicating the server is running
  res.end("Chat server is running.\n");
});

// Define the port for the HTTP server
const port = process.env.PORT || 3000;

// Start the HTTP server and log its URL
httpServer.listen(port, () => {
  log(`HTTP Server running at http://localhost:${port}`);
});

// Start the TCP server only in local environments
if (process.env.NODE_ENV !== "production") {
  startTcpServer();
}
