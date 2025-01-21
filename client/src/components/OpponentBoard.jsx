import "../styles/OpponentBoard.css";

const OpponentBoard = ({ matrix }) => {
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
    <div className="opponent">
      <div className="opponent-grid">
        {matrix.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`opponent-cell ${cell > 0 ? colorMap[cell] : ""}`}
            ></div>
          )),
        )}
      </div>
    </div>
  );
};

export default OpponentBoard;
