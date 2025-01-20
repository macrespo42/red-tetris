"use strict";
class Player {
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
    this.score = 0;
    this.n = 0;
  }
}

export default Player;
