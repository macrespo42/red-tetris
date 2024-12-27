import "../styles/Game.css";
const Game = () => {
  return (<div className="gameView">
    <div className="gameBoard"></div>
    <div className="gameSideInfos">
      <h2>Next pieces</h2>
      <div className="nextPieces"></div>
      <h2>Controls</h2>
      <div className="controls"></div>
    </div>
    <div className="opponentBoards">
      this is where opponent board show up
    </div>
  </div>);
};

export default Game;
