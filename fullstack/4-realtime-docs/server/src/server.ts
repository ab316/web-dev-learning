import { Server } from "socket.io";

const io = new Server(3001, {
  cors: { origin: "http://localhost:3000", methods: ["GET", "POST"] },
});

io.on("connection", (socket) => {
  console.log("Connected to socket");

  socket.on("get-document", (documentId: string) => {
    console.log("get-document:", documentId);
    const data = "hello";
    socket.join(documentId);
    socket.emit("load-document", data);

    socket.on("send-changes", (delta) => {
      console.log("send-changes event", delta);
      socket.broadcast.to(documentId).emit("receive-changes", delta);
    });
  });
  socket.on("disconnect", (reason) => {
    console.log(`Disconnected from socket. Reason: ${reason}`);
  });
});
