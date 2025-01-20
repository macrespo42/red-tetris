import { useState } from "react";
import "../styles/GameView.css";
import TetrisGrid from "./TetrisGrid";
import { socket } from "../socket";
import { useSelector } from "react-redux";
import useMoveTetrominoes from "../hooks/useMoveTetrominoes";
import Button from "./Button";
import EndGameModal from "./EndGameModal";
import Confetti from "react-confetti";

const GameView = () => {
  const [matrix, setMatrix] = useState(
    Array(20)
      .fill(0)
      .map(() => Array(10).fill(0)),
  );

  const [modalOpen, setModalOpen] = useState(false);
  const [isWinner, setIsWinner] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const room = useSelector((state) => state.player.value.roomName);
  const socketId = useSelector((state) => state.player.value.socketId);

  function playAgain() {
    socket.emit("play again");
  }

  socket.on("game state", (players) => {
    const currentPlayer = players.find((player) => player.id === socketId);
    if (currentPlayer) setMatrix([...currentPlayer.board.grid]);
    if (currentPlayer && currentPlayer.isAlive === false) {
      setIsWinner(false);
      openModal();
    }
    if (currentPlayer && currentPlayer.isWinner) {
      setIsWinner(true);
      openModal();
    }
  });

  useMoveTetrominoes({ room: room });

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
      <EndGameModal isOpen={modalOpen} onClose={closeModal}>
        {isWinner ? (
          <>
            <h2>Victory!</h2>
            <Button text="PLAY AGAIN" onClick={playAgain} />
          </>
        ) : (
          <>
            <h2>Game Over</h2>
            <Button text="LEAVE" to={`/`} />
          </>
        )}
      </EndGameModal>
      {isWinner && modalOpen ? (
        <>
          <Confetti width={window.innerWidth} height={window.innerHeight} />
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default GameView;
