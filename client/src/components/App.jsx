import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import HomeView from "./HomeView";
import RoomView from "./RoomView";
import GameView from "./GameView";
import { Provider } from "react-redux";
import store from "../store";
import SocketMiddleware from "./SocketMiddleware";
import React from "react";

const  App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <SocketMiddleware>
          <Routes>
            <Route path="/" element={<HomeView />} />
            <Route path="/lobby/:room/:player" element={<RoomView />} />
            <Route path="/:room/:player" element={<GameView />} />
          </Routes>
        </SocketMiddleware>
      </Provider>
    </BrowserRouter>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);

export default App;