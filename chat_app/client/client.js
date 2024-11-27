const net = require("net");
const readline = require("readline");
const { log, errorLog } = require("../server/utils/logger");
const { HOST, PORT } = require("../server/config");

// Created an interface for reading input from the terminal
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});


// Created a TCP connection to the server using the HOST and PORT specified
const client = net.createConnection({ host: HOST, port: PORT }, () => {
  log("Connected to the server!");
});

let isNameSet = false;

// Listen for incoming data from the server
client.on("data", (data) => {
  const message = data.toString();
  log(message);
  if (isNameSet) rl.prompt();
});

// Listen for input from the user (via readline interface)
rl.on("line", (line) => {
  if (!isNameSet) {
    client.write(line.trim());
    isNameSet = true;
  } else {
    client.write(line.trim());
  }
  rl.prompt();
});

// Handle any errors that may occur with the client connection
client.on("error", (err) => {
  errorLog(`Client error: ${err.message}`);
});