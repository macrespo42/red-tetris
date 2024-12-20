import Button from "./Button";

const Home = () => {
  return (
    <div className="homepage">
      <header>
        <h1>RED TETRIS</h1>
      </header>
      <section className="home-section">
        <input type="text" name="room-name" placeholder="room" />
        <input type="text" name="player-name" placeholder="pseudo" />
        <Button text="CREATE ROOM" to="/" />
        <Button text="JOIN GAME" to="/" />
      </section>
    </div>
  );
};

export default Home;
