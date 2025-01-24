import { useEffect } from "react";
import { socket } from "../socket";

function useMoveTetrominoes({ room }) {
  useEffect(() => {
    function keyPressedHandler(e) {
      if (e.code === "ArrowLeft" || e.code === "KeyK") {
        e.preventDefault();
        socket.emit("move left", room);
      } else if (e.code === "ArrowRight" || e.code === "KeyH") {
        e.preventDefault();
        socket.emit("move right", room);
      } else if (e.code === "ArrowDown" || e.code === "KeyJ") {
        e.preventDefault();
        socket.emit("move down", room);
      } else if (e.code === "Space") {
        e.preventDefault();
        socket.emit("move bottom", room);
      } else if (e.code === "ArrowUp" || e.code === "KeyL") {
        e.preventDefault();
        socket.emit("rotate", room);
      }
    }

    document.addEventListener("keydown", keyPressedHandler);

    return () => {
      document.removeEventListener("keydown", keyPressedHandler);
    };
  }, [room]);
}

export default useMoveTetrominoes;
