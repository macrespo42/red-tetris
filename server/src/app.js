"use strict";
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
      const { room, player, socketId } = gameInfos;
      socket.join(room);
      let game = games.find((game) => game.name == room);

      if (game != undefined) {
        const isPlayerInGame = game.players.find((p) => p.id === socketId);
        if (!isPlayerInGame) game.addPlayer(new Player(player, socketId));
      } else {
        game = new Game(room);
        game.addPlayer(new Player(player, socketId, true));
        games.push(game);
      }
      io.to(room).emit("players list", game.players);
    });
  });

  io.on("disconnect", (socket) => {
    console.log(`User: ${socket.id} disconnect`);
    games.forEach((game) => {
      const playerIndex = game.players.findIndex(
        (player) => player.id === socket.id,
      );
      if (playerIndex !== -1) {
        game.players.splice(playerIndex, 1);
      }
    });
  });
}

server.listen(app.get("port"), () => {
  console.log(`App listening on port ${app.get("port")}`);
});
