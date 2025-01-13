import { useState } from "react";
import "../styles/GameView.css";
import TetrisGrid from "./TetrisGrid";
import { socket } from "../socket";
import { useSelector } from "react-redux";
import useMoveTetrominoes from "../hooks/useMoveTetrominoes";

const GameView = () => {
  const [matrix, setMatrix] = useState(
    Array(20)
      .fill(0)
      .map(() => Array(10).fill(0)),
  );
  const socketId = useSelector((state) => state.player.value.socketId);

  socket.on("game state", (players) => {
    const currentPlayer = players.find((player) => player.id === socketId);
    if (currentPlayer) setMatrix([...currentPlayer.board.grid]);
  });

  useMoveTetrominoes({ id: socketId });

  return (
    <div className="gameView">
      <TetrisGrid matrix={matrix} />
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
