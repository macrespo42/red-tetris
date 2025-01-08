import "../styles/TetrisGrid.css";
import { useState } from "react";

const TetrisGrid = ({ width, height }) => {
  const [matrix, setMatrix] = useState(
    Array(height)
      .fill(0)
      .map(() => Array(width).fill(0)),
  );

  const handleFillCell = () => {
    matrix[4][5] = 1;
    setMatrix([...matrix]);
  };

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
      <button onClick={handleFillCell}>click me!</button>
    </div>
  );
};

export default TetrisGrid;
