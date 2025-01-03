import { createRoot } from "react-dom/client";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import HomeView from "./HomeView";
import RoomView from "./RoomView";
import GameView from "./GameView";
import { socket } from "../socket";

const App = () => {
  useEffect(() => {
    socket.on("connect", () => {
      console.log(`Connected: ${socket.id}`);
    });

    socket.on("connect_error", (err) => {
      console.error("Connection error: ", err.message);
      setTimeout(() => socket.connect(), 5000);
    });

    return () => {
      socket.off("connect");
      socket.off("connect_error");
      socket.disconnect();
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/lobby/:room/:player" element={<RoomView />} />
        <Route path="/:room/:player" element={<GameView />} />
      </Routes>
    </BrowserRouter>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
