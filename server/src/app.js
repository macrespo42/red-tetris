import express from "express";
import { Server } from "socket.io";

const app = express();
const io = new Server({
  cors: {
    origin: "http://localhost:5173",
  },
});

io.listen(4000);

app.set("port", process.env.PORT || 3000);

app.get("/", (_, res) => {
  res.send("hello world");
});

app.get("/:room/:player_name", (_, res) => {
  res.send("My room");
});

io.on("connection", (socket) => {
  console.log("A user is connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

app.listen(app.get("port"), () => {
  console.log(`App listening on port ${app.get("port")}`);
});
