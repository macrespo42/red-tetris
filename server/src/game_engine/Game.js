"use strict";
import { randomUUID } from "node:crypto";
import Piece from "./Piece.js";
import Board from "./Board.js";

class Game {
  static QUEUE_SIZE = 4096;

  /**
   * @param { string } name
   **/
  constructor(name) {
    this.name = name;
    this.id = randomUUID();
    this.isStarted = false;
    this.players = new Map();
    this.pieceQueue = [];
  }

  /**
   * @param { Player } newPlayer
   **/
  addPlayer(newPlayer) {
    newPlayer.board = new Board();
    newPlayer.drawNextPiece(this.pieceQueue[0]);
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
        player.currentPiece = player.board.moveDown(player.currentPiece);
        if (!player.currentPiece) {
          this.#updateScores(player);
          this.#getNextPiece(player);
          this.#checkGameState(player);
        }
      }
    });
  }

  /**
   * @param {string} movement
   * @param {string} playerId
   **/
  movePiece(movement, playerId) {
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
  #updateScores(player) {
    const rowsFullfilled = player.board.checkForFullRows();
    if (rowsFullfilled > 0) player.computeScore(rowsFullfilled);
    if (rowsFullfilled > 1) {
      this.players.forEach((penalizedPlayer) => {
        if (penalizedPlayer.id !== player.id && penalizedPlayer.isAlive) {
          penalizedPlayer.board.inflictPenalty(rowsFullfilled);
        }
      });
    }
  }

  /**
   * @param { Player } player
   **/
  #getNextPiece(player) {
    player.currentPiece = player.board.insertPiece(
      this.pieceQueue[player.board.nextPieceIndex].clone(),
    );
    player.drawNextPiece(this.pieceQueue[player.board.nextPieceIndex + 1]);
  }

  /**
   * @param { Player } currentPlayer
   **/
  #hasWon(currentPlayer) {
    const isAlive = currentPlayer.isAlive;
    let aliveCount = 0;
    this.players.forEach((player) => {
      if (player.isAlive) {
        aliveCount++;
      }
    });
    return isAlive && aliveCount === 1 && this.players.size > 1;
  }

  /**
   * @param { Player } player
   **/
  #checkGameState(player) {
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
