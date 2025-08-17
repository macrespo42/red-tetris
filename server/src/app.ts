import express from "express";
import { Server } from "socket.io";
import { createServer } from "node:http";
import os from "node:os";
import Game from "./game_engine/Game.ts";
import Player from "./game_engine/Player.ts";
import { rateLimit } from "express-rate-limit";
import helmet from "helmet";
import cors from "cors";

const app = express();
const server = createServer(app);

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "192.168.1.181:5173",
      "http://redtetris.duckdns.org:5173",
      "http://redtetris.duckdns.org:5173/",
    ],
    methods: ["GET", "POST"],
  }),
);

const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "192.168.1.181:5173",
      "http://redtetris.duckdns.org:5173/",
      "http://redtetris.duckdns.org:5173",
    ],
    methods: ["GET", "POST"],
  },
});

app.set("port", process.env.PORT || 3000);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

app.use("/api/", limiter);
app.use(helmet());

app.get("/ping", (_, res) => {
  res.send("pong");
});

{
  const games: Game[] = [];

  io.on("connection", (socket) => {
    console.log(`A user is connected: ${socket.id}`);

    socket.on("joining room", (gameInfos) => {
      const { room, player } = gameInfos;
      let game = games.find((game) => game.name == room);

      if (game !== undefined && game.isStarted) {
        return;
      }
      socket.join(room);

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
      io.to(room).emit("game infos", game.id);
    });

    socket.on("move left", (gameInfos) => {
      const { gameId, room } = gameInfos;
      const game = games.find((g) => g.id === gameId);
      if (game) {
        game.movePiece("moveLeft", socket.id);
        const playersArray = Array.from(game.players.values());
        io.to(room).emit("game state", playersArray);
      }
    });

    socket.on("move right", (gameInfos) => {
      const { gameId, room } = gameInfos;
      const game = games.find((g) => g.id === gameId);
      if (game) {
        game.movePiece("moveRight", socket.id);
        const playersArray = Array.from(game.players.values());
        io.to(room).emit("game state", playersArray);
      }
    });

    socket.on("move down", (gameInfos) => {
      const { gameId, room } = gameInfos;
      const game = games.find((g) => g.id === gameId);
      if (game) {
        game.movePiece("moveDown", socket.id);
        const playersArray = Array.from(game.players.values());
        io.to(room).emit("game state", playersArray);
      }
    });

    socket.on("move bottom", (gameInfos) => {
      const { gameId, room } = gameInfos;
      const game = games.find((g) => g.id === gameId);
      if (game) {
        game.movePiece("moveBottom", socket.id);
        const playersArray = Array.from(game.players.values());
        io.to(room).emit("game state", playersArray);
      }
    });

    socket.on("rotate", (gameInfos) => {
      const { gameId, room } = gameInfos;
      const game = games.find((g) => g.id === gameId);
      if (game) {
        game.movePiece("rotate", socket.id);
        const playersArray = Array.from(game.players.values());
        io.to(room).emit("game state", playersArray);
      }
    });

    socket.on("leave game", (gameInfos) => {
      const { gameId, room } = gameInfos;
      const game = games.find((g) => g.id === gameId);
      socket.leave(room);
      if (game) {
        if (game.players.has(socket.id)) {
          game.players.delete(socket.id);
        }
        if (game.players.size === 0) games.splice(games.indexOf(game), 1);
      }
    });

    socket.on("start game", (gameInfos) => {
      const { gameIdentifier: gameId, room, gameMode } = gameInfos;
      const game = games.find((g) => g.id === gameId);
      if (game) {
        game.setGameMode(gameMode);
        const player = game.players.get(socket.id);
        if (player && player.isGameOwner) {
          game.startGame();

          let playersArray = Array.from(game.players.values());
          io.to(room).emit("game started", gameId);

          const interval = game.mode === "quick" ? 150 : 500;

          const gameInterval = setInterval(() => {
            game.tick();
            playersArray = Array.from(game.players.values());
            io.to(room).emit("game state", playersArray);
            if (game.isStarted === false) {
              game.clearGame();
              clearInterval(gameInterval);
            }
          }, interval);
        }
      }
    });
  });
}

const getNetworkAddress = (): string => {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    const currentInterface = interfaces[name];
    if (currentInterface) {
      for (const iface of currentInterface) {
        if (iface.family === "IPv4" && !iface.internal) {
          return iface.address;
        }
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
