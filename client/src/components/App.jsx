import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import HomeView from "./HomeView";
import RoomView from "./RoomView";
import GameView from "./GameView";

const App = () => {
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
