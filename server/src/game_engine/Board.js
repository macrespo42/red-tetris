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
   * @returns {Piece || null}
   **/
  insertPiece(piece) {
    const offset = Math.floor((this.width - 1) / 2) - 1;
    let collision = false;

    piece.shape[piece.currentRotation] = piece.shape[piece.currentRotation].map(
      (position) => ({
        x: position.x,
        y: position.y + offset,
      }),
    );

    piece.shape[piece.currentRotation].forEach((position) => {
      if (this.grid[position.x][position.y] > 0) {
        collision = true;
      }
    });

    if (collision) return null;

    piece.shape[piece.currentRotation].forEach((position) => {
      this.grid[position.x][position.y] = piece.color;
    });

    return piece;
  }

  checkForFullRows() {
    let score = 0;
    const fullRowsIndex = [];
    for (let i = 0; i < this.grid.length; i++) {
      if (!this.grid[i].some((cell) => cell === 0 || cell === 9)) {
        fullRowsIndex.push(i);
      }
    }
    for (const i of fullRowsIndex) {
      this.grid.splice(i, 1);
      this.grid.unshift(Array(this.width).fill(0));
      score += 40;
    }
    return score;
  }

  /**
   * @param {Piece} [piece]
   * @returns { Piece || null }
   **/
  moveDown(piece) {
    if (!piece) {
      return null;
    }
    const newPositions = [];
    let collision = false;

    piece.shape[piece.currentRotation].forEach((position) => {
      const newX = position.x + 1;
      const newY = position.y;

      if (
        newX >= this.height ||
        (this.grid[newX][newY] > 0 && !piece.isInPiece(newX, newY, 0))
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

    piece.shape[piece.currentRotation].forEach((position) => {
      this.grid[position.x][position.y] = 0;
    });

    newPositions.forEach((position) => {
      this.grid[position.x][position.y] = piece.color;
    });

    piece.shape[piece.currentRotation] = newPositions;
    return piece;
  }

  moveHorizontally(piece, direction) {
    if (!piece) {
      return piece;
    }
    const newPositions = [];
    let collision = false;

    piece.shape[piece.currentRotation].map((position) => ({
      x: position.x,
      y: position.y,
    }));

    piece.shape[piece.currentRotation].forEach((position) => {
      const newX = position.x;
      const newY = direction === "right" ? position.y + 1 : position.y - 1;

      if (
        newY < 0 ||
        newY >= this.width ||
        (this.grid[newX][newY] > 0 && !piece.isInPiece(newX, newY, 0))
      ) {
        collision = true;
      } else {
        newPositions.push({ x: newX, y: newY });
      }
    });

    if (collision) return piece;

    piece.shape[piece.currentRotation].forEach((position) => {
      this.grid[position.x][position.y] = 0;
    });

    newPositions.forEach((position) => {
      this.grid[position.x][position.y] = piece.color;
    });

    piece.shape[piece.currentRotation] = newPositions;
    return piece;
  }
}

export default Board;
