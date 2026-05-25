import Board from "./Board.ts";
import Piece from "./Piece.ts";

type score = {
  [key: number]: number;
};

class Player {
  name: string;
  id: string;
  isGameOwner: boolean;
  board: Board;
  currentPiece: Piece | null;
  isAlive: boolean;
  isWinner: boolean;
  score: number;
  nextPieceGrid: number[][];

  static scoringSystem: score = {
    1: 40,
    2: 100,
    3: 300,
    4: 1200,
  };

  constructor(name: string, id: string, isGameOwner: boolean = false) {
    this.name = name;
    this.id = id;
    this.isGameOwner = isGameOwner;
    this.board = new Board();
    this.currentPiece = null;
    this.isAlive = true;
    this.isWinner = false;
    this.score = 0;
    this.nextPieceGrid = Array(6)
      .fill(0)
      .map(() => Array(6).fill(0));
  }

  drawNextPiece(piece: Piece) {
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

    piece.shape[piece.currentRotation]?.forEach((position) => {
      const row = this.nextPieceGrid[position.x + xOffset];

      if (row) {
        row[position.y + yOffset] = piece.color;
      }
    });
  }

  computeScore(lines: number) {
    // original BPS scoring system
    const scoreAddition = Player.scoringSystem[lines];
    if (scoreAddition) {
      this.score += scoreAddition;
    } else {
      this.score += Player.scoringSystem[4] || 0;
    }
  }

  reset() {
    this.board = new Board();
    this.currentPiece = null;
    this.isAlive = true;
    this.isWinner = false;
    this.score = 0;
  }
}

/**
    piece.shape[piece.currentRotation]?.forEach((position) => {
      this.nextPieceGrid[position.x + xOffset]![position.y + yOffset] =
        piece.color;
    });
 * **/

export default Player;
