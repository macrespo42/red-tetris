"use strict";
import Piece from "./Piece.js";
import Board from "./Board.js";

class Game {
  QUEUE_SIZE = 4096;

  /**
   * @param { string } name
   **/
  constructor(name) {
    this.name = name;
    this.isStarted = false;
    this.players = new Map();
    this.pieceQueue = [];
  }

  #fillPieceQueue() {
    for (let i = 0; i < this.QUEUE_SIZE; i++) {
      const piece = new Piece();
      this.pieceQueue.push(piece);
    }
  }

  /**
   * @param { Player} player
   **/
  addPlayer(newPlayer) {
    newPlayer.board = new Board();
    this.players.set(newPlayer.id, newPlayer);
  }

  startGame() {
    this.#fillPieceQueue();
    this.isStarted = true;
    this.players.forEach((player) => {
      player.currentPiece = player.board.insertPiece(
        this.pieceQueue[player.board.nextPieceIndex],
      );
    });
  }

  tick() {
    this.players.forEach((player) => {
      player.currentPiece = player.board.moveDown(player.currentPiece);
      if (!player.currentPiece) {
        player.currentPiece = player.board.insertPiece(
          this.pieceQueue[player.board.nextPieceIndex],
        );
      }
    });
  }

  move(movement, playerId) {
    const player = this.players.get(playerId);
    if (movement === "moveLeft") {
      player.currentPiece = player.board.moveHorizontally(
        player.currentPiece,
        "left",
      );
    } else if (movement === "moveRight") {
      player.currentPiece = player.board.moveHorizontally(
        player.currentPiece,
        "right",
      );
    } else if (movement === "moveDown") {
      player.currentPiece = player.board.moveDown(player.currentPiece);
    } else if (movement === "moveBottom") {
      while (player.currentPiece) {
        player.currentPiece = player.board.moveDown(player.currentPiece);
      }
    }
  }
}

export default Game;
