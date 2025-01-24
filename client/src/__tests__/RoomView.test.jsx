import { describe, it, expect, test } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { socket } from "../socket";
import HomeView from "../components/HomeView";
import RoomView from "../components/RoomView";
import { vi, beforeEach } from "vitest";
import SocketMiddleware from "../components/SocketMiddleware";
import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "../playerSlice";
import store from "../store";

describe("room view", () => {
  it("home render", async () => {
    const home = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/"]}>
          <Routes>
            <Route path="/" element={<HomeView />} />
            <Route path="/lobby/:room/:player" element={<RoomView />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
    const user = userEvent.setup();
    const input = screen.getByPlaceholderText(/room/i);
    fireEvent.change(input, { target: { value: "room_test" } });
    const inputPseudo = screen.getByPlaceholderText("pseudo");
//     console.log("Input pseudo trouvé:", inputPseudo);
    fireEvent.change(inputPseudo, { target: { value: "user_mockup" } });
    await user.click(screen.getByText(/CREATE ROOM/i));
    expect(screen.getByText("room_test")).toBeDefined();
    home.unmount();
  });
});

// describe("room view", () => {
//   let store;
//   vi.mock("../socket", () => ({
//     socket: {
//       on: vi.fn(),
//       off: vi.fn(),
//       disconnect: vi.fn(),
//       emit: vi.fn(),
//       connect: vi.fn(),
//       id: "test-socket-id",
//     },
//   }));

//   beforeEach(() => {
//     store = configureStore({
//       reducer: {
//         player: playerReducer,
//       },
//       preloadedState: {
//         player: {
//           value: {
//             socketId: "fake-socket-id",
//             name: "fake-name",
//             roomName: "fake-room-name",
//             isGameOwner: false,
//           },
//         },
//       },
//     });
//     store.dispatch = vi.fn();
//   });
//   beforeEach(() => {
//     vi.clearAllMocks();
//   });
//   it("socket on", async () => {
//     render(
//       <Provider store={store}>
//         <SocketMiddleware>
//           <RoomView />
//         </SocketMiddleware>
//       </Provider>
//     );
//     vi.mock("react-router", () => ({
//       ...vi.importActual("react-router"),
//       useNavigate: () => vi.fn(),
//       useParams: () => ({ room: "testRoom", player: "testPlayer" }),
//       MemoryRouter: () => vi.fn(),
//       Routes: () => vi.fn(),
//       Route: () => vi.fn(),
//     }));
//     const onConnectCallback = socket.on.mock.calls.find(([event]) => event === "players list")[1];
//     const mockPlayers = [
//       { id: "test-socket-id", name: "Player 1", isGameOwner: true },
//       { id: "player-2", name: "Player 2", isGameOwner: false },
//     ];
//     onConnectCallback(mockPlayers);
//     expect(store.getState().player.value.socketId).toBe("fake-socket-id");
//     expect(screen.getByText(/testRoom/i)).toBeDefined();
//   });
// });
