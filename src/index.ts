import { createServer } from "http";
import path from "path";
import express from "express";
import socketio from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new socketio.Server(httpServer);

app.use(express.static(path.resolve(__dirname, "..", "public")));

io.on("connection", (socket) => {
  console.log(`Socket ID: ${socket.id}`);

  socket.on("message", (message) => {
    console.log(`Received message: ${message}`);
    io.emit("new-message", message);
  });
});

const PORT = 3333;
httpServer.listen(PORT, () => {
  console.log(`Server running on http://locahost:${PORT}`);
});
