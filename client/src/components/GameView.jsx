import { useState } from "react";
import "../styles/GameView.css";
import TetrisGrid from "./TetrisGrid";
import { socket } from "../socket";
import { useSelector } from "react-redux";
import useMoveTetrominoes from "../hooks/useMoveTetrominoes";
import NextPiece from "./NextPiece";
import OpponentBoard from "./OpponentBoard";
import Controls from "./Controls";
import Button from "./Button";
import EndGameModal from "./EndGameModal";
import Confetti from "react-confetti";
import { useNavigate } from "react-router";

const GameView = () => {
  const [matrix, setMatrix] = useState(
    Array(20)
      .fill(0)
      .map(() => Array(10).fill(0)),
  );

  const [nextPieceMatrix, setNexpieceMatrix] = useState(
    Array(6)
      .fill(0)
      .map(() => Array(6).fill(0)),
  );

  const [opponents, setOpponents] = useState([]);
  const [currentPlayerScore, setCurrentPlayerScore] = useState(0);

  const navigate = useNavigate();
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
  const isGameOwner = useSelector((state) => state.player.value.isGameOwner);
  const playerName = useSelector((state) => state.player.value.name);

  function playAgain() {
    socket.emit("start game", { room });
    closeModal();
  }

  function leaveRoom() {
    socket.emit("leave game", room);
    closeModal();
    navigate("/");
  }

  socket.on("game started", () => {
    closeModal();
  });

  socket.on("game state", (players) => {
    const currentPlayer = players.find((player) => player.id === socketId);
    if (currentPlayer) {
      setMatrix([...currentPlayer.board.grid]);
      setNexpieceMatrix([...currentPlayer.nextPieceGrid]);
      setCurrentPlayerScore(currentPlayer.score);
    }

    if (currentPlayer && currentPlayer.isAlive === false) {
      setIsWinner(false);
      openModal();
    }

    if (currentPlayer && currentPlayer.isWinner) {
      setIsWinner(true);
      openModal();
    }

    const playerLst = [];
    players.forEach((opponent) => {
      if (opponent.id !== socketId) {
        playerLst.push(opponent);
      }
    });
    setOpponents([...playerLst]);
  });

  useMoveTetrominoes({ room: room });

  return (
    <div className="gameView">
      <TetrisGrid
        matrix={matrix}
        name={playerName}
        score={currentPlayerScore}
      />
      <div className="gameSideInfos">
        <h3>Next piece:</h3>
        <NextPiece matrix={nextPieceMatrix} />
        <h3>Controls:</h3>
        <Controls />
      </div>
      <div className="opponentBoards">
        {opponents.map((player, index) => (
          <OpponentBoard
            key={index}
            matrix={player.board.grid}
            name={player.name}
            score={player.score}
          />
        ))}
      </div>
      <EndGameModal isOpen={modalOpen} onClose={closeModal}>
        <>
          <h2>{isWinner ? "Victory" : "Defeat"}</h2>
          {isGameOwner && <Button text="PLAY AGAIN" onClick={playAgain} />}
          <Button text="LEAVE" onClick={leaveRoom} />
        </>
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
