"use strict";

class Board {
  /**
   * @param {number} [width=10]
   * @param {number} [height=20]
   **/
  constructor(width = 10, height = 20) {
    this.width = width;
    this.height = height;
    this.nextPieceIndex = 0;
    this.pieceInMovement = false;
    this.#initGrid();
  }

  #initGrid() {
    this.grid = [];
    this.grid = Array(this.height)
      .fill(0)
      .map(() => Array(this.width).fill(0));
  }

  /**
   * @param {Piece} [piece]
   **/
  insertPiece(piece) {
    const middleWidth = Math.floor(this.width / 2);
    for (let h = 0; h < 3; h++) {
      this.grid[h].splice(
        middleWidth - 1,
        piece.shape[h].length,
        ...piece.shape[h],
      );
    }
    //check collision
    //save piece position for next movement ?
    this.pieceInMovement = true;
    this.nextPieceIndex++;
  }
}

export default Board;
