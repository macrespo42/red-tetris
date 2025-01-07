"use strict";
class Player {
  /**
   * @param { string } name
   * @param { string } id
   * @param { boolean } [gameOwner=false]
   **/
  constructor(name, id, gameOwner = false) {
    this.name = name;
    this.id = id;
    this.inGame = false;
    this.gameOwner = gameOwner;
  }
}

export default Player;
