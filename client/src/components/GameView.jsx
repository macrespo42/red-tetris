import "../styles/GameView.css";
import TetrisGrid from "./TetrisGrid";

const GameView = () => {
  return (
    <div className="gameView">
      <TetrisGrid width={10} height={20} />
      <div className="gameSideInfos">
        <h2>Next pieces</h2>
        <div className="nextPieces"></div>
        <h2>Controls</h2>
        <div className="controls"></div>
      </div>
      <div className="opponentBoards">this is where opponent board show up</div>
    </div>
  );
};

export default GameView;
