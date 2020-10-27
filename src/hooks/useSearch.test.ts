import { act, renderHook } from "@testing-library/react-hooks";

import useSearch, { Props, ReturnType } from "./useSearch";

type Item = { id: number; name: string };
describe("useSearch", () => {
  const items: Item[] = [
    {
      id: 1,
      name: "Item 1",
    },
    {
      id: 2,
      name: "Cat 2",
    },
    {
      id: 3,
      name: "Dog 3",
    },
  ];

  describe("when hook mounts", () => {
    it("is not filtering", () => {
      const { result } = renderHook<Props<Item>, ReturnType<Item>>(
        ({ items, itemKey }) => useSearch<Item>({ items, itemKey }),
        { initialProps: { items, itemKey: "name" } }
      );

      expect(result.current.filteredItems).toEqual(items);
    });

    it("does not have search string", () => {
      const { result } = renderHook<Props<Item>, ReturnType<Item>>(
        ({ items, itemKey }) => useSearch<Item>({ items, itemKey }),
        { initialProps: { items, itemKey: "name" } }
      );

      expect(result.current.search).toEqual("");
    });
  });

  describe("when onSearch is called with non-empty search string", () => {
    it("filters items", () => {
      const search = "Cat";
      const { result } = renderHook<Props<Item>, ReturnType<Item>>(
        ({ items, itemKey }) => useSearch<Item>({ items, itemKey }),
        { initialProps: { items, itemKey: "name" } }
      );

      act(() => {
        result.current.onSearch(search);
      });
      expect(result.current.filteredItems.length).toEqual(1);
      expect(result.current.filteredItems[0]).toEqual(items[1]);
    });

    it("returns search string", () => {
      const search = "cat";
      const { result } = renderHook<Props<Item>, ReturnType<Item>>(
        ({ items, itemKey }) => useSearch<Item>({ items, itemKey }),
        { initialProps: { items, itemKey: "name" } }
      );

      act(() => {
        result.current.onSearch(search);
      });
      expect(result.current.search).toEqual(search);
    });

    it("filters items case-insensitively", () => {
      const search = "cat";
      const { result } = renderHook<Props<Item>, ReturnType<Item>>(
        ({ items, itemKey }) => useSearch<Item>({ items, itemKey }),
        { initialProps: { items, itemKey: "name" } }
      );

      act(() => {
        result.current.onSearch(search);
      });
      expect(result.current.filteredItems.length).toEqual(1);
      expect(result.current.filteredItems[0]).toEqual(items[1]);
    });

    it("can filter items case-sensitively", () => {
      const search = "cat";
      const { result } = renderHook<Props<Item>, ReturnType<Item>>(
        ({ items, itemKey, options }) =>
          useSearch<Item>({ items, itemKey, options }),
        {
          initialProps: {
            items,
            itemKey: "name",
            options: { caseSensitive: true },
          },
        }
      );

      act(() => {
        result.current.onSearch(search);
      });
      expect(result.current.filteredItems.length).toEqual(0);
    });
  });

  describe("when onSearch is called with empty search string", () => {
    it("resets filteredItems to initial items", () => {
      const search = "Cat";
      const { result } = renderHook<Props<Item>, ReturnType<Item>>(
        ({ items, itemKey }) => useSearch<Item>({ items, itemKey }),
        { initialProps: { items, itemKey: "name" } }
      );
      act(() => {
        result.current.onSearch(search);
      });
      expect(result.current.filteredItems.length).toEqual(1);

      act(() => {
        result.current.onSearch("");
      });
      expect(result.current.filteredItems.length).toEqual(3);
      expect(result.current.filteredItems).toEqual(items);
    });

    it("resets search string to initial string", () => {
      const search = "Cat";
      const { result } = renderHook<Props<Item>, ReturnType<Item>>(
        ({ items, itemKey }) => useSearch<Item>({ items, itemKey }),
        { initialProps: { items, itemKey: "name" } }
      );

      act(() => {
        result.current.onSearch(search);
      });
      expect(result.current.search).toEqual(search);

      act(() => {
        result.current.onSearch("");
      });
      expect(result.current.search).toEqual("");
    });
  });

  describe("when hook receives new items", () => {
    const newItems: Item[] = [
      {
        id: 4,
        name: "Item 4",
      },
      {
        id: 5,
        name: "Cat 5",
      },
      {
        id: 6,
        name: "Dog 6",
      },
    ];

    it("does not reset search", () => {
      const search = "Cat";
      const { result, rerender } = renderHook<Props<Item>, ReturnType<Item>>(
        ({ items, itemKey }) => useSearch<Item>({ items, itemKey }),
        { initialProps: { items, itemKey: "name" } }
      );

      act(() => {
        result.current.onSearch(search);
      });
      expect(result.current.filteredItems.length).toEqual(1);

      rerender({ items: newItems, itemKey: "name" });

      expect(result.current.filteredItems[0]).toEqual(newItems[1]);
    });
  });
});
