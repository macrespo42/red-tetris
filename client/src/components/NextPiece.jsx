import "../styles/NextPiece.css";

const NextPiece = ({ matrix }) => {
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
    <div className="nextPieces">
      <div id="next-piece-grid">
        {matrix.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`cell-mini ${cell > 0 ? colorMap[cell] : ""}`}
            ></div>
          )),
        )}
      </div>
    </div>
  );
};

export default NextPiece;
