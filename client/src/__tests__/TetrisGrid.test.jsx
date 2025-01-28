import { describe, it, expect, test } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";
import userEvent from '@testing-library/user-event'
import { Provider } from "react-redux";
import store from "../store";
import HomeView from "../components/HomeView";
import RoomView from "../components/RoomView";
import TetrisGrid from "../components/TetrisGrid";


describe("room view", () => {

  it("render right color",() =>{

    const home = render(
      <TetrisGrid matrix={[[1,1,1], [0, 0, 0],[2,2,2]]}/>
    )
    const cellsBefore = screen.getAllByRole("gameboard");
    expect(cellsBefore[1].className).toEqual("cell yellow")
    expect(cellsBefore[4].className).toEqual("cell ")
  home.unmount()
  })
})