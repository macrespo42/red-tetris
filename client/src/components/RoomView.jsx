import { useNavigate, useParams } from "react-router";
import { IoMdSettings } from "react-icons/io";
import Button from "./Button";
import Tetrominoes from "./Tetrominoes";
import EndGameModal from "./EndGameModal";
import "../styles/RoomView.css";
import { socket } from "../socket";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { name, roomName, isGameOwner, gameId } from "../playerSlice";

const RoomView = () => {
  const navigate = useNavigate();
  let { room, player } = useParams();
  let [players, setPlayers] = useState([player]);
  const [isOpen, setIsOpen] = useState(false);
  const [gameMode, setGameMode] = useState("normal");
  const dispatch = useDispatch();
  const socketId = useSelector((state) => state.player.value.socketId);
  const gameOwner = useSelector((state) => state.player.value.isGameOwner);
  const gameIdentifier = useSelector((state) => state.player.value.gameId);

  socket.on("players list", (playersLst) => {
    players = playersLst.map((player) => player);
    const currentPlayer = players.find((player) => player.id === socketId);
    if (currentPlayer) {
      dispatch(isGameOwner({ isGameOwner: currentPlayer.isGameOwner }));
    }
    setPlayers([...players]);
  });

  socket.on("game infos", (receivedGameId) => {
    dispatch(gameId({ gameId: receivedGameId }));
  });

  socket.on("game started", (gameId) => {
    if (gameId === gameIdentifier) navigate(`/${gameIdentifier}/${player}`);
  });

  useEffect(() => {
    dispatch(name({ name: player }));
    dispatch(roomName({ roomName: room }));
    socket.emit("joining room", { room, player, socketId });
  }, [room, player, dispatch, socketId]);

  function startGame() {
    if (gameOwner) {
      socket.emit("start game", { gameIdentifier, room, gameMode });
    }
  }


 const handleOnClose = () => {
  setIsOpen(false);
 }
  return (
    <div className="room-page">
      {gameOwner && (
        <div className="game__settings" title="game_settings" onClick={() => setIsOpen(!isOpen)}>
          <IoMdSettings size={75} aria-label="game_settings" />
        </div>
      )}
      <header>
        <h2>{room}</h2>
      </header>
      <section className="player-list">
        <ul>
          {players.map((player) => (
            <li
              className={`player ${player.isGameOwner ? "owner" : "guest"}`}
              key={player.id + player.name}
            >
              {player.name} {player.isGameOwner && "👑"}
            </li>
          ))}
        </ul>
      </section>
      <div className="submit-button">
        {gameOwner && <Button id="start-room" text="START" onClick={startGame} />}
      </div>
      <Tetrominoes />
      <EndGameModal isOpen={isOpen} onClose={handleOnClose}>
        <h2>Settings</h2>
        <label htmlFor="standard-select">Game mode selection:</label>
        <div className="select">
          <select
            id="standard-select"
            name="game_mode"
            onChange={(e) => {
              setGameMode(e.target.value);
            }}
          >
            <option value="normal">normal</option>
            <option value="broken_piece">broken piece</option>
            <option value="sudden_death">sudden death</option>
            <option value="domination">domination</option>
            <option value="quick">quick</option>
          </select>
        </div>
        <Button text="Confirm" onClick={() => setIsOpen(false)}></Button>
      </EndGameModal>
    </div>
  );
};

export default RoomView;
