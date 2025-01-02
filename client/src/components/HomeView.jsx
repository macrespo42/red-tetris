import Button from "./Button";
import "../styles/HomeView.css";
import { useState } from "react";

const HomeView = () => {
  const [room, setRoom] = useState("");
  const [player, setPlayer] = useState("");
  return (
    <div className="homepage">
      <header>
        <h1>RED TETRIS</h1>
      </header>
      <section className="home-section">
        <input
          type="text"
          name="player-name"
          placeholder="pseudo"
          autoComplete="off"
          onChange={(e) => setPlayer(e.target.value)}
        />
        <input
          type="text"
          name="room-name"
          placeholder="room"
          autoComplete="off"
          onChange={(e) => setRoom(e.target.value)}
        />
        <div className="button-container">
          <Button text="CREATE ROOM" to={`/lobby/${room}/${player}`} />
          <Button text="JOIN GAME" to={`/lobby/${room}/${player}`} />
        </div>
      </section>
    </div>
  );
};

export default HomeView;
