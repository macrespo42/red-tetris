import { useParams } from "react-router";
import Button from "./Button";
import "../styles/RoomView.css";
import { socket } from "../socket";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { name, roomName } from "../playerSlice";

const RoomView = () => {
  let { room, player } = useParams();
  let [players, setPlayers] = useState([player]);
  const dispatch = useDispatch();
  const socketId = useSelector((state) => state.player.value.socketId);

  socket.on("players list", (playersLst) => {
    players = playersLst.map((player) => player);
    setPlayers([...players]);
  });

  useEffect(() => {
    dispatch(name({ name: player }));
    dispatch(roomName({ roomName: room }));
    socket.emit("joining room", { room, player, socketId });
  }, [room, player, dispatch, socketId]);

  return (
    <div className="room-page">
      <header>
        <h1>{room}</h1>
      </header>
      <section className="player-list">
        <ul>
          {players.map((player) => (
            <li className="guest" key={player.id}>
              {player.name}
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
