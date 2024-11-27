const log = (message) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${message}`);
  };
  
  const errorLog = (message) => {
    const timestamp = new Date().toISOString();
    console.error(`[${timestamp}] ERROR: ${message}`);
  };
  
  module.exports = { log, errorLog };
  