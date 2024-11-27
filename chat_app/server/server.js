const http = require('http');
const { startTcpServer } = require('./controllers/chatController');
const { log } = require("./utils/logger");

// HTTP server to handle requests (Vercel friendly)
const httpServer = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Chat server is running.\n');
});

// Set the port for Vercel (or fallback to 3000 for local development)
const port = process.env.PORT || 3000;
httpServer.listen(port, () => {
  log(`HTTP Server running at http://localhost:${port}`);
});

// Start TCP server for local testing
if (process.env.NODE_ENV !== 'production') {
  startTcpServer();
}
