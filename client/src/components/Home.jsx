import Button from "./Button";

const Home = () => {
  return (
    <div className="homepage">
      <header>
        <h1 className="main-title">RED-TETRIS</h1>
      </header>
      <section className="home-section">
        <input type="text" name="room-name" value="" placeholder="room" />
        <input type="text" name="player-name" value="" placeholder="pseudo" />
        <Button text="CREATE ROOM" to="/" />
        <Button text="JOIN GAME" to="/" />
      </section>
    </div>
  );
};

export default Home;
