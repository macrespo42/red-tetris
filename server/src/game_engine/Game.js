"use strict";
import Piece from "./Piece.js";
import Board from "./Board.js";

class Game {
  static QUEUE_SIZE = 4096;

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
    if (this.pieceQueue.length === Game.QUEUE_SIZE) {
      this.pieceQueue.sort(() => Math.random() - 0.5);
    } else {
      for (let i = 0; i < Game.QUEUE_SIZE; i++) {
        const piece = new Piece();
        this.pieceQueue.push(piece);
      }
    }
  }

  /**
   * @param { Player } player
   **/
  addPlayer(newPlayer) {
    newPlayer.board = new Board();
    this.players.set(newPlayer.id, newPlayer);
  }

  startGame() {
    this.#fillPieceQueue();
    this.isStarted = true;
  }

  hasWon(currentPlayer) {
    const isAlive = currentPlayer.isAlive;
    let aliveCount = 0;
    this.players.forEach((player) => {
      if (player.isAlive) {
        aliveCount++;
      }
    });
    return isAlive && aliveCount === 1;
  }

  /**
   * @returns {(string|null)}
   **/
  tick() {
    this.players.forEach((player) => {
      if (player.isAlive) {
        player.currentPiece = player.board.moveDown(player.currentPiece);
        if (!player.currentPiece) {
          const rowsFullfilled = player.board.checkForFullRows();
          if (rowsFullfilled > 0) player.computeScore(rowsFullfilled);
          if (rowsFullfilled > 1) {
            this.players.forEach((penalizedPlayer) => {
              if (penalizedPlayer.id !== player.id && penalizedPlayer.isAlive) {
                penalizedPlayer.board.inflictPenalty(rowsFullfilled);
              }
            });
          }
          player.currentPiece = player.board.insertPiece(
            this.pieceQueue[player.board.nextPieceIndex].clone(),
          );
          if (!player.currentPiece) {
            player.isAlive = false;
          } else {
            if (this.hasWon(player)) {
              player.isWinner = true;
              this.isStarted = false;
            }
          }
        }
      }
    });
  }

  /**
   * @param {string} movement
   * @param {string} playerId
   **/
  move(movement, playerId) {
    const player = this.players.get(playerId);
    if (!player.isAlive) {
      return;
    }
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
    } else if (movement === "rotate") {
      player.currentPiece = player.board.rotate(player.currentPiece);
    }
  }
}

export default Game;
