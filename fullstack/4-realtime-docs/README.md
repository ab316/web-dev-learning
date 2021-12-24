==== Realtime Docs ====

# Introduction

This project demonstrates a Google Docs clone. It features an editor and realtime editing of documents by multiple people

## Technologies Used

- React
- Socket.io
- MongoDB

## Components

### Client

React application that has the text editor. Going to the home page creates a new document.
To open an existing document, copy the URL of the existing document

### Server

Node application that implements the Socket.io servers and connects to the MongoDB. It receives updates from all clients and broadcasts them to the other clients that have the same document open

# Usage

- `yarn`
- Start client with `yarn workspace client start`
- Set server mongoDB variables, found in `server.ts`
- `yarn workspace server start`
- Go the `http://localhost:3000`
- The browser is redirected to a new document. Open the same URL in another tab. Write in one tab and see the change in the other

# Limiations

- No UI to see existing documents
- If the server restarts, the existing sessions are invalidated since the Socket.io rooms are only in memory

# Future Work

- UI to see list of documents
- Resilience to server restarts
