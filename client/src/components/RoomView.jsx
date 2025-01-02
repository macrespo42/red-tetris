import { useParams } from "react-router";
import Button from "./Button";
import "../styles/RoomView.css";

const RoomView = () => {
  const { room } = useParams();
  const players = ["player1", "player2", "lorem ipsum"];
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
        <Button text="START" to="/" />
      </div>
    </div>
  );
};

export default RoomView;
