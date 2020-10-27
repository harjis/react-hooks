import React from "react";
import { act, render, waitFor } from "@testing-library/react";

import { fakeHttpLib } from "../../api/fakeHttpLib";
import { PostsWithSearch } from ".";
import userEvent from "@testing-library/user-event";

jest.mock("../../api/fakeHttpLib");
const postsMock = [
  { id: 1, name: "Mocked Post 1" },
  { id: 2, name: "Mocked Post 2" },
  { id: 3, name: "Mocked Post 3" },
];

describe("PostsWithSearch", () => {
  it("is initially loading", () => {
    (fakeHttpLib.get as jest.Mock).mockResolvedValue(postsMock);
    const { getByText } = render(<PostsWithSearch />);
    waitFor(() => expect(getByText("Loading...")).toBeInTheDocument());
  });

  it("has items after loading", () => {
    (fakeHttpLib.get as jest.Mock).mockResolvedValue(postsMock);
    const { getAllByText } = render(<PostsWithSearch />);
    waitFor(() => {
      const items = getAllByText(/Mocked Post [0-9]/);
      expect(items.length).toEqual(3);
    });
  });

  describe("when user types in search input", () => {
    it("filters content accordingly", () => {
      (fakeHttpLib.get as jest.Mock).mockResolvedValue(postsMock);
      const { getByPlaceholderText, getAllByText } = render(
        <PostsWithSearch />
      );
      act(() => {
        userEvent.type(getByPlaceholderText("Search"), "3");
      });

      waitFor(() => {
        const items = getAllByText(/Mocked Post [0-9]/);
        expect(items.length).toEqual(1);
      });
    });
  });

  describe("when user clears search input", () => {
    it("resets content to initial items", () => {
      (fakeHttpLib.get as jest.Mock).mockResolvedValue(postsMock);
      const { getByPlaceholderText, getAllByText } = render(
        <PostsWithSearch />
      );
      act(() => {
        userEvent.type(getByPlaceholderText("Search"), "3");
      });

      waitFor(() => {
        const items = getAllByText(/Mocked Post [0-9]/);
        expect(items.length).toEqual(1);
      });

      act(() => {
        userEvent.type(getByPlaceholderText("Search"), "");
      });

      waitFor(() => {
        const items = getAllByText(/Mocked Post [0-9]/);
        expect(items.length).toEqual(3);
      });
    });
  });
});
