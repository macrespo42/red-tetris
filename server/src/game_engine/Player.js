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
    this.inGame = false;
    this.isGameOwner = isGameOwner;
    this.board = null;
    this.currentPiece = null;
  }
}

export default Player;
