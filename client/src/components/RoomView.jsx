import { useParams } from "react-router";
import Button from "./Button";
import "../styles/RoomView.css";
import { socket } from "../socket";
import { useEffect } from "react";

const RoomView = () => {
  const { room, player } = useParams();
  const players = ["player1", "player2", "lorem ipsum"];

  useEffect(() => {
    socket.emit("joining room", { room, player });
  }, [room, player]);

  function startGame() {
    console.log(`SARTING THE GAMEEEEEE.... ${player}`);
    socket.connect();
    socket.emit("start game", player);
  }
  return (
    <div className="room-page">
      <header>
        <h1>{room}</h1>
      </header>
      <section className="player-list">
        <ul>
          {players.map((player) => (
            <li className="guest" key={player}>
              {player}
            </li>
          ))}
        </ul>
      </section>
      <button onClick={startGame}>click me lol</button>
      <div className="submit-button">
        <Button text="START" to={`/${room}/${player}`} />
      </div>
    </div>
  );
};

export default RoomView;
