# Real-time Chat Server

This is a simple real-time chat server and client application built using Node.js. It allows multiple users to connect to a shared chatroom and send messages to each other. The messages are broadcasted to all connected clients except the sender. The server utilizes TCP sockets for communication between clients. It can be deployed locally for full functionality or on platforms supporting HTTP requests for basic deployment.

## Features
- **Multiple client support**: Handles multiple clients connected simultaneously.
- **User registration**: Upon connecting, each user is prompted to enter their name.
- **Real-time messaging**: Users can send messages, which are broadcasted to all other connected users.
- **Concurrency management**: Utilizes threading or async patterns for handling multiple clients concurrently.

## Table of Contents
- [Video Demo](#video-demo)
- [Installation](#installation)
- [Usage](#usage)
- [Deployment](#deployment)
  - [Local Deployment (TCP)](#local-deployment-tcp)
  - [Vercel Deployment (HTTP)](#vercel-deployment-http)
- [Application Architecture](#application-architecture)
- [Assumptions and Design Decisions](#assumptions-and-design-decisions)

---


## Video Demo

Watch the video below to see the working of the chat app:


https://github.com/user-attachments/assets/9860cf04-e6d3-4caa-8f2c-de96d097a267




## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Avinash01110/Kuvaka_chat_app.git
   cd ./chat_app

2. Install the dependencies:
   ```bash
   npm install

## Usage

### Running the Server Locally (TCP)
To run the chat server locally using TCP sockets:

1. Start the server:
    ```bash
    npm run start

2. In the terminal, the server will prompt for user input once a client connects. Users will need to provide their names to start chatting. The server will broadcast the messages to all other connected clients.

### Running the Client Locally (TCP)
You can connect a client to the server using Telnet or another TCP client:

1. Open a new terminal window and use the following command to connect to the server:
    ```bash
    npm run chat

2. Once connected, the server will ask for your username. After entering your name, you can start sending messages that will be broadcast to all other connected clients.

## Deployment

### Local Deployment (TCP)
For local development, you can run the server and test the full functionality, including real-time messaging via TCP sockets:

1. Ensure the server is running locally as explained in the Usage section.

2. Clients can connect to server using a the provided command.

### Vercel Deployment (HTTP)
Since Vercel does not support raw TCP connections, the HTTP version of the server is used here. The chat server will work by responding to HTTP requests and simulating the behavior of a chat server.


## Application Architecture
The application consists of the following components:

1. Server (TCP):
    
    a. The server listens for incoming TCP connections from clients.
    
    b. When a new client connects, the server prompts the user to provide their name.

    c. Upon receiving a message from a client, the server broadcasts it to all other connected clients.

2. Client:

    a. A client connects to the server and sends messages that are broadcast to other users.

    b. Each message is tagged with the user's name to make it identifiable to other users.

3. Concurrency:

    a. The server uses asynchronous operations with Node.js's built-in net module to handle multiple client connections concurrently.
    
    b. Each client connection is handled in a non-blocking manner, allowing the server to process multiple messages at the same time.

4. Deployment:
    On Vercel, only the HTTP version of the server runs, simulating the chat functionality but without real-time socket communication.

## Assumptions and Design Decisions
- **Concurrency**: To handle multiple clients simultaneously, the server uses the net module’s asynchronous capabilities. Each client is assigned a unique socket, and the server communicates with them asynchronously.

- **TCP vs HTTP**: The server was originally designed to work with TCP sockets for real-time communication. However, for deployment on Vercel (which doesn’t support raw TCP), an HTTP server is used for simulating server behavior.

- **Name Input**: When a new client connects, they are prompted to enter their name. This is stored and used in the messages broadcast to other clients.

- **Error Handling**: Basic error handling is implemented, including socket errors and client disconnections.
