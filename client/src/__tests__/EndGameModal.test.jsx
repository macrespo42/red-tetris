import { describe, it, expect,  } from "vitest";
import { render, screen,  } from "@testing-library/react";
import { vi } from "vitest";
import EndGameModal from "../components/EndGameModal";
describe("EndGameModal", () => {
  it("renders the modal", () => {
    const home = render(
      <EndGameModal isOpen={true} onClose={() => {}}>
        <div>Game Over</div>
      </EndGameModal>
    );
    expect(screen.getByText("Game Over")).toBeDefined();
    home.unmount();
  });
  it("renders the modal and close with escape", () => {
    const onCloseMock = vi.fn();
    const home = render(
      <EndGameModal isOpen={true} onClose={onCloseMock}>
        <div>Game Over</div>
      </EndGameModal>
    );
    const event = new KeyboardEvent("keydown", { key: "Escape" });
    document.dispatchEvent(event);
    expect(onCloseMock).toHaveBeenCalled();
    home.unmount();
  });
  it("null return if open is false", () => {
    const home = render(
      <EndGameModal isOpen={false} onClose={() => {}}>
        <div>Game Over</div>
      </EndGameModal>
    );
    expect(screen.queryByText("Game Over")).toBeNull();
    home.unmount();
  });
});
