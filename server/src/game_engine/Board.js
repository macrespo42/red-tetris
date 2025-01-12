"use strict";

class Board {
  /**
   * @param {number} [width=10]
   * @param {number} [height=20]
   **/
  constructor(width = 10, height = 20) {
    this.width = width;
    this.height = height;
    this.offset = 3;
    this.nextPieceIndex = 0;
    this.pieceInMovement = false;
    this.pieces = [];
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
    this.pieces.push(piece);
    piece.shape.forEach((position) => {
      console.table(this.grid);
      console.log(position);
      this.grid[position.x][this.offset + position.y] = 1;
    });
  }

  fall() {
    console.error("Not implemented yet");
  }
}

export default Board;
