import { Server } from "socket.io";
import { instrument } from "@socket.io/admin-ui";
import mongoose from "mongoose";
import Document from "./schema/Document";

setup();

async function setup() {
  const io = new Server(3001, {
    cors: {
      origin: ["http://localhost:3000", "https://admin.socket.io"],
      credentials: true,
      methods: ["GET", "POST"],
    },
  });

  // Add socket admin namespace. Online admin console: https://admin.socket.io/
  instrument(io, { auth: false });

  await mongoose.connect(
    `mongodb+srv://admin:${process.env.MONGODB_PASS}@cluster0.pjuci.mongodb.net/realtime-docs?retryWrites=true&w=majority`
  );
  console.log("Connected to DB");

  io.on("connection", (socket) => {
    console.log("Connected to socket");

    socket.on("get-document", async (documentId: string) => {
      console.log("get-document:", documentId);
      const document = await Document.findOrCreate(documentId);
      socket.join(documentId);
      socket.emit("load-document", document.data);

      socket.on("send-changes", (delta) => {
        console.log("send-changes event", delta);
        socket.broadcast.to(documentId).emit("receive-changes", delta);
      });

      socket.on("save-document", async (data) => {
        console.log("save-document event", data);
        await Document.findByIdAndUpdate(documentId, { data: data });
      });
    });
    socket.on("disconnect", (reason) => {
      console.log(`Disconnected from socket. Reason: ${reason}`);
    });
  });
}
