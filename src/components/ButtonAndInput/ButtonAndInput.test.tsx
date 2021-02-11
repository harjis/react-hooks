import React from "react";
import { render, screen } from "@testing-library/react";

import { ButtonAndInput } from "./ButtonAndInput";
import userEvent from "@testing-library/user-event";

describe("ButtonAndInput", () => {
  describe("when pressing button", () => {
    it("focuses on input", () => {
      render(<ButtonAndInput />);
      const input = screen.getByRole("input");
      const button = screen.getByRole("button");
      userEvent.click(button);

      expect(document.activeElement).not.toBe(button);
      expect(document.activeElement).toBe(input);
    });
  });
});
