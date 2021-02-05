import React from "react";
import { render, waitFor } from "@testing-library/react";

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
  it("is initially loading", async () => {
    (fakeHttpLib.get as jest.Mock).mockResolvedValue(postsMock);
    const { getByText } = render(<PostsWithSearch />);
    await waitFor(() => expect(getByText("Loading...")).toBeInTheDocument());
  });

  it("has items after loading", async () => {
    (fakeHttpLib.get as jest.Mock).mockResolvedValue(postsMock);
    const { getAllByText } = render(<PostsWithSearch />);
    await waitFor(() => {
      const items = getAllByText(/Mocked Post [0-9]/);
      expect(items.length).toEqual(3);
    });
  });

  describe("when user types in search input", () => {
    it("filters content accordingly", async () => {
      (fakeHttpLib.get as jest.Mock).mockResolvedValue(postsMock);
      const { getByPlaceholderText, getAllByText } = render(
        <PostsWithSearch />
      );
      userEvent.type(getByPlaceholderText("Search"), "3");

      await waitFor(() => {
        const items = getAllByText(/Mocked Post/);
        expect(items.length).toEqual(1);
      });
    });
  });

  describe("when user clears search input", () => {
    it("resets content to initial items", async () => {
      (fakeHttpLib.get as jest.Mock).mockResolvedValue(postsMock);
      const { getByPlaceholderText, getAllByText } = render(
        <PostsWithSearch />
      );
      userEvent.type(getByPlaceholderText("Search"), "3");

      await waitFor(() => {
        const items = getAllByText(/Mocked Post/);
        expect(items.length).toEqual(1);
      });

      userEvent.clear(getByPlaceholderText("Search"));

      await waitFor(() => {
        const items = getAllByText(/Mocked Post/);
        expect(items.length).toEqual(3);
      });
    });
  });
});
