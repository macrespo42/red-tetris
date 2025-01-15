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

    socket.on("joining room", (gameInfos) => {
      const { room, player } = gameInfos;
      socket.join(room);
      let game = games.find((game) => game.name == room);

      if (game != undefined) {
        if (!game.players.get(socket.id))
          game.addPlayer(new Player(player, socket.id));
      } else {
        game = new Game(room);
        game.addPlayer(new Player(player, socket.id, true));
        games.push(game);
      }
      const playersArray = Array.from(game.players.values());
      io.to(room).emit("players list", playersArray);
    });

    socket.on("start game", (args) => {
      const { room } = args;
      const game = games.find((g) => g.name === room);
      if (game) {
        const player = game.players.get(socket.id);
        if (player && player.isGameOwner) {
          game.startGame();

          let playersArray = Array.from(game.players.values());
          io.to(room).emit("game started", playersArray);

          setInterval(() => {
            game.tick();
            playersArray = Array.from(game.players.values());
            io.to(room).emit("game state", playersArray);
          }, 500);

          socket.on("move left", (id) => {
            game.move("moveLeft", id);
            playersArray = Array.from(game.players.values());
            io.to(room).emit("game state", playersArray);
          });

          socket.on("move right", (id) => {
            game.move("moveRight", id);
            playersArray = Array.from(game.players.values());
            io.to(room).emit("game state", playersArray);
          });

          socket.on("move down", (id) => {
            game.move("moveDown", id);
            playersArray = Array.from(game.players.values());
            io.to(room).emit("game state", playersArray);
          });

          socket.on("move bottom", (id) => {
            game.move("moveBottom", id);
            playersArray = Array.from(game.players.values());
            io.to(room).emit("game state", playersArray);
          });
        }
      }
    });
  });

  io.on("disconnect", (socket) => {
    console.log(`User: ${socket.id} disconnect`);
    games.forEach((game) => {
      if (game.players[socket.id]) delete game.players[socket.id];
    });
  });
}

server.listen(app.get("port"), () => {
  console.log(`App listening on port ${app.get("port")}`);
});
