import "../styles/TetrisGrid.css";

const TetrisGrid = ({ matrix }) => {
  const colorMap = {
    1: "yellow",
    2: "green",
    3: "red",
    4: "purple",
    5: "orange",
    6: "dark-blue",
    7: "blue",
    8: "grey",
  };
  return (
    <div className="gameBoard">
      <div id="tetris-grid">
        {matrix.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`cell ${cell > 0 ? colorMap[cell] : ""}`}
            ></div>
          )),
        )}
      </div>
    </div>
  );
};

export default TetrisGrid;
