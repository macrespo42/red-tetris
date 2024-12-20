import { useParams } from "react-router";
import Button from "./Button";

const Room = () => {
  const { room } = useParams();
  const players = ["player1", "player2", "lorem ipsum"];
  return (
    <div className="room-page">
      <header>
        <h1 className="main-title">{room}</h1>
      </header>
      <section className="player-list">
        <ul>
          {players.map((player) => (
            <li key={player}>{player}</li>
          ))}
        </ul>
      </section>
      <Button text="START" to="/" />
    </div>
  );
};

export default Room;
