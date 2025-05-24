import { randomUUID, UUID } from "node:crypto";
import Piece from "./Piece.js";
import Board from "./Board.js";
import Player from "./Player.js";

class Game {
  name: string;
  mode: string;
  id: UUID;
  isStarted: boolean;
  players: Map<string, Player>;
  pieceQueue: Piece[];

  static QUEUE_SIZE = 10;

  constructor(name: string, mode: string = "normal") {
    this.name = name;
    this.mode = mode;
    this.id = randomUUID();
    this.isStarted = false;
    this.players = new Map();
    this.pieceQueue = [];
  }

  addPlayer(newPlayer: Player) {
    newPlayer.board = new Board();
    if (this.pieceQueue[0]) {
      newPlayer.drawNextPiece(this.pieceQueue[0]);
    }
    this.players.set(newPlayer.id, newPlayer);
  }

  startGame() {
    this.#fillPieceQueue();
    this.isStarted = true;
  }

  clearGame() {
    this.players.forEach((player) => {
      player.reset();
      player.board = new Board();
    });
  }

  tick() {
    this.players.forEach((player) => {
      if (player.isAlive) {
        if (player.board) {
          player.currentPiece = player.board.moveDown(player.currentPiece);
          if (!player.currentPiece) {
            this.#updateScores(player);
            this.#getNextPiece(player);
            this.#checkGameState(player);
          }
        }
      }
    });
  }

  setGameMode(mode: string) {
    this.mode = mode;
  }

  movePiece(movement: string, playerId: string) {
    const player = this.players.get(playerId);
    if (!player || !player.isAlive) {
      return;
    }
    if (movement === "moveLeft") {
      player.currentPiece = player.board.moveHorizontally(
        player.currentPiece,
        "left"
      );
    } else if (movement === "moveRight") {
      player.currentPiece = player.board.moveHorizontally(
        player.currentPiece,
        "right"
      );
    } else if (movement === "moveDown") {
      player.currentPiece = player.board.moveDown(player.currentPiece);
    } else if (movement === "moveBottom") {
      while (player.currentPiece) {
        player.currentPiece = player.board.moveDown(player.currentPiece);
      }
    } else if (movement === "rotate") {
      player.currentPiece = player.board.rotate(player.currentPiece);
    }
  }

  #fillPieceQueue() {
    if (this.mode === "broken_piece") {
      for (let i = 0; i < Game.QUEUE_SIZE; i++) {
        const piece = new Piece();
        if (Math.random() < 0.2) piece.color = 8;
        this.pieceQueue.push(piece);
      }
    } else if (this.pieceQueue.length === Game.QUEUE_SIZE) {
      this.pieceQueue.sort(() => Math.random() - 0.5);
    } else {
      for (let i = 0; i < Game.QUEUE_SIZE; i++) {
        this.pieceQueue.push(new Piece());
      }
    }
  }

  #forceWon(winner: Player) {
    this.players.forEach((player) => {
      if (player.id !== winner.id) player.isAlive = false;
    });
  }

  #updateScores(player: Player) {
    const rowsFullfilled = player.board.checkForFullRows();
    if (rowsFullfilled > 0) player.computeScore(rowsFullfilled);
    if (rowsFullfilled > 0 && this.mode === "sudden_death") {
      this.#forceWon(player);
    }
    if (
      rowsFullfilled > 1 ||
      (rowsFullfilled === 1 && this.mode === "domination")
    ) {
      this.players.forEach((penalizedPlayer) => {
        if (penalizedPlayer.id !== player.id && penalizedPlayer.isAlive) {
          if (this.mode === "domination") {
            penalizedPlayer.board.inflictPenalty(2);
          } else {
            penalizedPlayer.board.inflictPenalty(rowsFullfilled);
          }
        }
      });
    }
  }

  #getNextPiece(player: Player) {
    const nextPiece = this.pieceQueue[player.board.nextPieceIndex];
    if (nextPiece) {
      player.currentPiece = player.board.insertPiece(nextPiece.clone());
    }
    const nextNextPiece = this.pieceQueue[player.board.nextPieceIndex + 1];
    if (nextNextPiece) {
      player.drawNextPiece(nextNextPiece);
    }
  }

  #hasWon(currentPlayer: Player) {
    const isAlive = currentPlayer.isAlive;
    let aliveCount = 0;
    this.players.forEach((player) => {
      if (player.isAlive) {
        aliveCount++;
      }
    });
    return isAlive && aliveCount === 1 && this.players.size > 1;
  }

  #checkGameState(player: Player) {
    if (!player.currentPiece) {
      player.isAlive = false;
      if (this.players.size === 1) this.isStarted = false;
    } else {
      if (this.#hasWon(player)) {
        player.isWinner = true;
        this.isStarted = false;
      }
    }
  }
}

export default Game;
