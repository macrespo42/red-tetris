import express from "express";
import { Server } from "socket.io";
import { createServer } from "node:http";
import Game from "./game_engine/Game.js";
import Player from "./game_engine/Player.js";

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

{
  const games = [];

  io.on("connection", (socket) => {
    console.log(`A user is connected: ${socket.id}`);
    socket.on("start game", (player) => {
      console.log(`${player} Want to start the game!`);
    });

    socket.on("joining room", (gameInfos) => {
      const { room, player } = gameInfos;
      let game = games.find((game) => game.name == room);
      if (game != undefined) {
        game.addPlayer(new Player(player));
      } else {
        game = new Game(room);
        game.addPlayer(new Player(player));
        games.push(game);
      }
    });
  });
}

server.listen(app.get("port"), () => {
  console.log(`App listening on port ${app.get("port")}`);
});
