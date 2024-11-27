// Logs a general message to the console with a timestamp.
const log = (message) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${message}`);
};

// Logs an error message to the console with a timestamp.
const errorLog = (message) => {
  const timestamp = new Date().toISOString();
  console.error(`[${timestamp}] ERROR: ${message}`);
};

module.exports = { log, errorLog };
