import {  expect, test } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import HomeView from "../components/HomeView";

test("home render", () => {
  const home = render(
    <MemoryRouter>
      <HomeView />
    </MemoryRouter>
  );
  expect(screen.getByText(/RED TETRIS/)).toBeDefined();
  home.unmount();
});

test("test input pseudo", () => {
  const home = render(
    <MemoryRouter>
      <HomeView />
    </MemoryRouter>
  );
  const input = screen.getByPlaceholderText("pseudo");
  fireEvent.change(input, { target: { value: "23" } });
  expect(input.value).toBe("23");
  home.unmount();
});

test("test input room", () => {
  const home = render(
    <MemoryRouter>
      <HomeView />
    </MemoryRouter>
  );
  const input = screen.getByPlaceholderText("room");
  fireEvent.change(input, { target: { value: "23" } });
  expect(input.value).toBe("23");
  home.unmount();
});

// test("create room", async () => {
//   const home = render( 
//         <Provider store={store}>
//     <MemoryRouter initialEntries={["/"]}>
//          <Routes>
//         <Route path="/" element={<HomeView />} />
//         <Route path="/lobby/:room/:player" element={<RoomView />} /> 
//       </Routes>
//     </MemoryRouter>
//         </Provider>
//   );
//   const user = userEvent.setup()
//   const input = screen.getByPlaceholderText("room");
//   fireEvent.change(input, { target: { value: "room_test" } });
//   const inputPseudo = screen.getByPlaceholderText("pseudo");
//   fireEvent.change(inputPseudo, { target: { value: "user_mockup" } });
//   await user.click(screen.getByText(/CREATE ROOM/i));
//    expect(screen.getByText(/START/i)).toBeDefined();
//   expect(screen.getByText("room_test")).toBeDefined()
//   home.unmount()

// });

// test("join room", async () => {
//   const home = render( 
//     <MemoryRouter initialEntries={["/"]}>
//          <Routes>
//         <Route path="/" element={<HomeView />} />
//         <Route path="/lobby/:room/:player" element={<Room />} /> 
//       </Routes>
//     </MemoryRouter>
//   );
//   const user = userEvent.setup()
//   const input = screen.getByPlaceholderText("room");
//   fireEvent.change(input, { target: { value: "room_test" } });
//   const inputPseudo = screen.getByPlaceholderText("pseudo");
//   fireEvent.change(inputPseudo, { target: { value: "user_mockup" } });
//   await user.click(screen.getByText(/JOIN GAME/i));
//    expect(screen.getByText(/START/i)).toBeDefined();
//   expect(screen.getByText("room_test")).toBeDefined()
//   home.unmount()

// });
