import "../styles/TetrisGrid.css";

const TetrisGrid = ({ matrix }) => {
  return (
    <div className="gameBoard">
      <div id="tetris-grid">
        {matrix.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`cell ${cell === 1 ? "filled" : ""}`}
            ></div>
          )),
        )}
      </div>
    </div>
  );
};

export default TetrisGrid;
