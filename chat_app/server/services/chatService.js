class ChatService {
  constructor() {
    // A Map to store connected clients and their usernames
    // The key is the socket object, and the value is the username
    this.clients = new Map();
  }

  // It adds a new client to the Map.
  addClient(socket) {
    this.clients.set(socket, null);
  }

  // Sets the username for a connected client.
  setUsername(socket, username) {
    this.clients.set(socket, username);
  }

  // Retrieves the username of a connected client.
  getUsername(socket) {
    return this.clients.get(socket);
  }

  // Removes a client from the Map when they disconnect.
  removeClient(socket) {
    this.clients.delete(socket);
  }

  // Broadcasts a message to all connected clients except the sender.
  broadcastMessage(sender, message) {
    const senderName = this.getUsername(sender) || "Anonymous";
    const formattedMessage = `${senderName}: ${message}`;
    // Iterate over all connected clients
    this.clients.forEach((_, client) => {
      if (client !== sender) {
        client.write(formattedMessage);
      }
    });
  }
}

module.exports = new ChatService();
