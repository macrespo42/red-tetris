import { describe, it, expect, test } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";
import userEvent from '@testing-library/user-event'
import { Provider } from "react-redux";
import store from "../store";
import HomeView from "../components/HomeView";
import RoomView from "../components/RoomView";


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
  const user = userEvent.setup()
  const input = screen.getByPlaceholderText("room");
  fireEvent.change(input, { target: { value: "room_test" } });
  const inputPseudo = screen.getByPlaceholderText("pseudo");
  fireEvent.change(inputPseudo, { target: { value: "user_mockup" } });
  await user.click(screen.getByText(/CREATE ROOM/i));
  expect(screen.getByText("room_test")).toBeDefined()
  home.unmount()
});


})