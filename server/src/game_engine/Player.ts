"use strict";

class Player {
  static scoringSystem = {
    1: 40,
    2: 100,
    3: 300,
    4: 1200,
  };

  /**
   * @param { string } name
   * @param { string } id
   * @param { boolean } [gameOwner=false]
   **/
  constructor(name, id, isGameOwner = false) {
    this.name = name;
    this.id = id;
    this.isGameOwner = isGameOwner;
    this.board = null;
    this.currentPiece = null;
    this.isAlive = true;
    this.isWinner = false;
    this.score = 0;
    this.nextPieceGrid = Array(6)
      .fill(0)
      .map(() => Array(6).fill(0));
  }

  /**
   * @param { Piece } piece
   **/
  drawNextPiece(piece) {
    if (!piece) {
      return;
    }

    const xOffset = 2;
    const yOffset = piece.color === 7 ? 1 : 2;

    for (const row of this.nextPieceGrid) {
      for (let i = 0; i < row.length; i++) {
        row[i] = 0;
      }
    }

    piece.shape[piece.currentRotation].forEach((position) => {
      this.nextPieceGrid[position.x + xOffset][position.y + yOffset] =
        piece.color;
    });
  }

  /**
   * @param {number} lines
   **/
  computeScore(lines) {
    // original BPS scoring system
    const scoreAddition = Player.scoringSystem[lines];
    if (scoreAddition) {
      this.score += scoreAddition;
    } else {
      this.score += Player.scoringSystem[4];
    }
  }

  reset() {
    this.board = null;
    this.currentPiece = null;
    this.isAlive = true;
    this.isWinner = false;
    this.score = 0;
  }
}

export default Player;
