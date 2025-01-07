import { useParams } from "react-router";
import Button from "./Button";
import "../styles/RoomView.css";
import { socket } from "../socket";
import { useEffect, useState } from "react";

const RoomView = () => {
  let { room, player } = useParams();
  let [players, setPlayers] = useState([player]);

  socket.on("players list", (playersLst) => {
    players = playersLst.map((player) => player.name);
    setPlayers([...players]);
  });

  useEffect(() => {
    socket.emit("joining room", { room, player });
  }, [room, player]);

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
      <div className="submit-button">
        <Button text="START" to={`/${room}/${player}`} />
      </div>
    </div>
  );
};

export default RoomView;
