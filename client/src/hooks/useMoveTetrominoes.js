import { useEffect } from "react";
import { socket } from "../socket";

function useMoveTetrominoes({ gameId, room }) {
  useEffect(() => {
    function keyPressedHandler(e) {
      if (e.code === "ArrowLeft" || e.code === "KeyK") {
        e.preventDefault();
        socket.emit("move left", { gameId, room });
      } else if (e.code === "ArrowRight" || e.code === "KeyH") {
        e.preventDefault();
        socket.emit("move right", { gameId, room });
      } else if (e.code === "ArrowDown" || e.code === "KeyJ") {
        e.preventDefault();
        socket.emit("move down", { gameId, room });
      } else if (e.code === "Space") {
        e.preventDefault();
        socket.emit("move bottom", { gameId, room });
      } else if (e.code === "ArrowUp" || e.code === "KeyL") {
        e.preventDefault();
        socket.emit("rotate", { gameId, room });
      }
    }

    document.addEventListener("keydown", keyPressedHandler);

    return () => {
      document.removeEventListener("keydown", keyPressedHandler);
    };
  }, [room, gameId]);
}

export default useMoveTetrominoes;
