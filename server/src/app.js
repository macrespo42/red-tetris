import express from "express";
import { Server } from "socket.io";
import { createServer } from "node:http";

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: "http://localhost:5173",
  methods: ["GET", "POST"],
});

app.set("port", process.env.PORT || 3000);

app.get("/", (_, res) => {
  res.send("hello world");
});

io.on("connection", (socket) => {
  console.log(`A user is connected: ${socket.id}`);
});

server.listen(3000, () => {
  console.log(`App listening on port ${app.get("port")}`);
});
