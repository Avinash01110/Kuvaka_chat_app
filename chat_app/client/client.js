const net = require('net');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const SERVER_HOST = 'https://kuvaka-chat-app.onrender.com/'; // Replace with your Render-provided URL or IP address
const SERVER_PORT = 10000; // Default Render port, replace if needed

const socket = net.createConnection(SERVER_PORT, SERVER_HOST, () => {
  console.log('Connected to chat server');
});

socket.on('data', (data) => {
  console.log(data.toString().trim());
});

socket.on('error', (err) => {
  console.error(`Error: ${err.message}`);
});

socket.on('close', () => {
  console.log('Disconnected from server');
  rl.close();
});

rl.on('line', (input) => {
  socket.write(input);
});
