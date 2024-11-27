const net = require("net");
const readline = require("readline");
const { log, errorLog } = require("../server/utils/logger");
const { HOST, PORT } = require("../server/config");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const client = net.createConnection({ host: HOST, port: PORT }, () => {
  log("Connected to the server!");
});

let isNameSet = false;

client.on("data", (data) => {
  const message = data.toString();
  log(message);
  if (isNameSet) rl.prompt();
});

rl.on("line", (line) => {
  if (!isNameSet) {
    client.write(line.trim());
    isNameSet = true;
  } else {
    client.write(line.trim());
  }
  rl.prompt();
});

client.on("error", (err) => {
  errorLog(`Client error: ${err.message}`);
});
