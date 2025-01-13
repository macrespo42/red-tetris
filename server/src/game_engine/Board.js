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
    const offset = Math.floor((this.width - 1) / 2) - 1;
    piece.shape[0] = piece.shape[0].map((position) => ({
      x: position.x,
      y: position.y + offset,
    }));
    piece.shape[0].forEach((position) => {
      this.grid[position.x][position.y] = 1;
    });
    return piece;
  }

  moveDown(piece) {
    const newPositions = [];
    let collision = false;

    piece.shape[0].forEach((position) => {
      const newX = position.x + 1;
      const newY = position.y;

      if (
        newX >= this.height ||
        (this.grid[newX][newY] == 1 && !piece.isInPiece(newX, newY, 0))
      ) {
        collision = true;
      } else {
        newPositions.push({ x: newX, y: newY });
      }
    });

    if (collision) {
      this.nextPieceIndex++;
      return null;
    }

    piece.shape[0].forEach((position) => {
      this.grid[position.x][position.y] = 0;
    });

    newPositions.forEach((position) => {
      this.grid[position.x][position.y] = 1;
    });

    piece.shape[0] = newPositions;
    return piece;
  }

  moveHorizontally(piece, direction) {
    const newPositions = [];
    let collision = false;

    piece.shape[0].map((position) => ({
      x: position.x,
      y: position.y,
    }));

    piece.shape[0].forEach((position) => {
      const newX = position.x;
      const newY = direction === "right" ? position.y + 1 : position.y - 1;

      if (
        newY < 0 ||
        newY >= this.width ||
        (this.grid[newX][newY] == 1 && !piece.isInPiece(newX, newY, 0))
      ) {
        collision = true;
      } else {
        newPositions.push({ x: newX, y: newY });
      }
    });

    if (collision) {
      return piece;
    }

    piece.shape[0].forEach((position) => {
      this.grid[position.x][position.y] = 0;
    });

    newPositions.forEach((position) => {
      this.grid[position.x][position.y] = 1;
    });

    piece.shape[0] = newPositions;
    return piece;
  }
}

export default Board;
