import { act, renderHook } from "@testing-library/react-hooks";
import { Props, useSnapshotStore } from "./useSnapshotStore";

type State = {
  counter: number;
};
describe("useSnapshotStore", () => {
  const initialState = {
    counter: 0,
  };
  const props: Props<State> = {
    initialState,
    localStorageKey: "storage-1",
  };
  it("returns initial state on initial mount", () => {
    const { result } = renderHook((props) => useSnapshotStore(props), {
      initialProps: props,
    });

    expect(result.current.state).toEqual(initialState);
  });

  it("can persist state", () => {
    const { result } = renderHook((props) => useSnapshotStore(props), {
      initialProps: props,
    });

    const nextState = { counter: 100 };
    act(() => {
      result.current.save(nextState);
    });

    expect(result.current.state).toEqual(nextState);
  });

  it("can remove state", () => {
    const { result } = renderHook((props) => useSnapshotStore(props), {
      initialProps: props,
    });

    const nextState = { counter: 100 };
    act(() => {
      result.current.save(nextState);
    });

    expect(result.current.state).toEqual(nextState);
  });

  describe("when hook is called with duplicate id", () => {
    beforeEach(() => {
      jest.spyOn(console, "error");
      (console.error as jest.Mock).mockImplementation(() => true);
    });

    afterEach(() => {
      (console.error as jest.Mock).mockRestore();
    });

    it("throws an error", () => {
      renderHook((props) => useSnapshotStore(props), {
        initialProps: props,
      });

      expect(() => {
        renderHook((props) => useSnapshotStore(props), {
          initialProps: props,
        });
      }).toThrow();
    });
  });

  describe("when component re-mounts", () => {
    it("hydrates state from localStorage if it is present", () => {
      const { result, unmount } = renderHook(
        (props) => useSnapshotStore(props),
        {
          initialProps: props,
        }
      );
      const nextState = { counter: 100 };
      act(() => {
        result.current.save(nextState);
      });
      expect(result.current.state).toEqual(nextState);
      unmount();

      const { result: result2 } = renderHook(
        (props) => useSnapshotStore(props),
        {
          initialProps: props,
        }
      );

      expect(result2.current.state).toEqual(nextState);
    });

    it("starts from initialState if no previous state is present", () => {
      const { result, unmount } = renderHook(
        (props) => useSnapshotStore(props),
        {
          initialProps: props,
        }
      );
      const nextState = { counter: 100 };
      act(() => {
        result.current.save(nextState);
      });
      expect(result.current.state).toEqual(nextState);
      unmount();

      const newInitialState = { counter: 1 };
      const { result: result2 } = renderHook(
        (props) => useSnapshotStore(props),
        {
          initialProps: {
            initialState: newInitialState,
            localStorageKey: "new-key",
          },
        }
      );

      expect(result2.current.state).toEqual(newInitialState);
    });
  });
});
