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
    this.n = 0;
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
}

export default Player;
