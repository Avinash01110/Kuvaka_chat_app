class ChatService {
    constructor() {
      this.clients = new Map();
    }
  
    addClient(socket) {
      this.clients.set(socket, null);
    }
  
    setUsername(socket, username) {
      this.clients.set(socket, username);
    }
  
    getUsername(socket) {
      return this.clients.get(socket);
    }
  
    removeClient(socket) {
      this.clients.delete(socket);
    }
  
    broadcastMessage(sender, message) {
      const senderName = this.getUsername(sender) || 'Anonymous';
      const formattedMessage = `${senderName}: ${message}`;
      this.clients.forEach((_, client) => {
        if (client !== sender) {
          client.write(formattedMessage);
        }
      });
    }
  }
  
  module.exports = new ChatService();
  