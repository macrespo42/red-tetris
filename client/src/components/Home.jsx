import Button from "./Button";
import "../styles/Home.css";

const Home = () => {
  return (
    <div className="homepage">
      <header>
        <h1>RED TETRIS</h1>
      </header>
      <section className="home-section">
        <input type="text" name="player-name" placeholder="pseudo" />
        <input type="text" name="room-name" placeholder="room" />
        <div className="button-container">
          <Button text="CREATE ROOM" to="/" />
          <Button text="JOIN GAME" to="/" />
        </div>
      </section>
    </div>
  );
};

export default Home;
