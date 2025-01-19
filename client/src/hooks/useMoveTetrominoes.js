import { useEffect } from "react";
import { socket } from "../socket";

function useMoveTetrominoes({ id }) {
  useEffect(() => {
    function keyPressedHandler(e) {
      if (e.code === "ArrowLeft") {
        console.log("Pressing arrow left");
        e.preventDefault();
        socket.emit("move left", id);
      } else if (e.code === "ArrowRight") {
        e.preventDefault();
        console.log("Pressing arrow right");
        socket.emit("move right", id);
      } else if (e.code === "ArrowDown") {
        e.preventDefault();
        socket.emit("move down", id);
      } else if (e.code === "Space") {
        e.preventDefault();
        socket.emit("move bottom", id);
      } else if (e.code === "ArrowUp") {
        e.preventDefault();
        socket.emit("rotate", id);
      } else {
        console.log("Unhandled keystroke");
      }
    }

    document.addEventListener("keydown", keyPressedHandler);

    return () => {
      document.removeEventListener("keydown");
    };
  }, [id]);
}

export default useMoveTetrominoes;
