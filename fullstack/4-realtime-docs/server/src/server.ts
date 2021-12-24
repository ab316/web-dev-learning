import { Server } from "socket.io";
import { instrument } from "@socket.io/admin-ui";
import mongoose from "mongoose";
import Document from "./schema/Document";

const MONGODB_PROTOCOL = process.env.MONGODB_PROTOCOL ?? "mongodb+srv";
const MONGODB_USER = process.env.MONGODB_USER ?? "admin";
const MONGODB_PASS = process.env.MONGODB_PASS ?? "admin";
const MONGODB_SERVER =
  process.env.MONGODB_SERVER ?? "cluster0.pjuci.mongodb.net";
const MONGODB_DB = process.env.MONGODB_DB ?? "realtime-docs";

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

  const dbUri = `${MONGODB_PROTOCOL}://${MONGODB_USER}:${MONGODB_PASS}@${MONGODB_SERVER}/${MONGODB_DB}?retryWrites=true&w=majority`;
  await mongoose.connect(dbUri);
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
