import Button from "./Button";
import "../styles/Home.css";
import { useState } from "react";

const Home = () => {
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
          onChange={(e) => setPlayer(e.target.value)}
        />
        <input
          type="text"
          name="room-name"
          placeholder="room"
          aria-label="room"
          onChange={(e) => setRoom(e.target.value)}
        />
        <div className="button-container">
          <Button id="create-room" text="CREATE ROOM" to={`/lobby/${room}/${player}`} />
          <Button id="join-room" text="JOIN GAME" to={`/lobby/${room}/${player}`} />
        </div>
      </section>
    </div>
  );
};

export default Home;
