"use strict";
import express from "express";
import { Server } from "socket.io";
import { createServer } from "node:http";
import os from "node:os";
import Game from "./game_engine/Game.js";
import Player from "./game_engine/Player.js";

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: "http://localhost:5173",
  methods: ["GET", "POST"],
});

app.set("port", process.env.PORT || 3000);

app.get("/ping", (_, res) => {
  res.send("pong");
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

    socket.on("move left", (room) => {
      const game = games.find((g) => g.name === room);
      if (game) {
        game.move("moveLeft", socket.id);
        const playersArray = Array.from(game.players.values());
        io.to(room).emit("game state", playersArray);
      }
    });

    socket.on("move right", (room) => {
      const game = games.find((g) => g.name === room);
      if (game) {
        game.move("moveRight", socket.id);
        const playersArray = Array.from(game.players.values());
        io.to(room).emit("game state", playersArray);
      }
    });

    socket.on("move down", (room) => {
      const game = games.find((g) => g.name === room);
      if (game) {
        game.move("moveDown", socket.id);
        const playersArray = Array.from(game.players.values());
        io.to(room).emit("game state", playersArray);
      }
    });

    socket.on("move bottom", (room) => {
      const game = games.find((g) => g.name === room);
      if (game) {
        game.move("moveBottom", socket.id);
        const playersArray = Array.from(game.players.values());
        io.to(room).emit("game state", playersArray);
      }
    });

    socket.on("rotate", (room) => {
      const game = games.find((g) => g.name === room);
      if (game) {
        game.move("rotate", socket.id);
        const playersArray = Array.from(game.players.values());
        io.to(room).emit("game state", playersArray);
      }
    });

    socket.on("start game", (args) => {
      const { room } = args;
      const game = games.find((g) => g.name === room);
      if (game) {
        const player = game.players.get(socket.id);
        if (player && player.isGameOwner) {
          game.startGame();

          let playersArray = Array.from(game.players.values());
          io.to(room).emit("game started");

          const gameInterval = setInterval(() => {
            game.tick();
            playersArray = Array.from(game.players.values());
            io.to(room).emit("game state", playersArray);
            if (game.isStarted === false) {
              clearInterval(gameInterval);
            }
          }, 500);
        }
      }
    });
  });

  io.on("leave game", (socket) => {
    console.log(`User: ${socket.id} leave game`);
    games.forEach((game) => {
      if (game.players[socket.id]) delete game.players[socket.id];
    });
  });

  io.on("disconnect", (socket) => {
    console.log(`User: ${socket.id} disconnect`);
    games.forEach((game) => {
      if (game.players[socket.id]) delete game.players[socket.id];
    });
  });
}

/**
 * @returns {string}
 **/
const getNetworkAddress = () => {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === "IPv4" && !iface.internal) {
        return iface.address;
      }
    }
  }
  return "127.0.0.1";
};

server.listen(app.get("port"), "0.0.0.0", () => {
  console.log(`App listening on port http://localhost:${app.get("port")}`);
  console.log(
    `Accessible on the network: http://${getNetworkAddress()}:${app.get("port")}`,
  );
});
