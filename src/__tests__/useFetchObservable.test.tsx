import { renderHook } from "@testing-library/react-hooks";
import { from, Observable } from "rxjs";

import useFetchObservable, { LoadingState } from "../hooks/useFetchObservable";

const initialData: string[] = [];
describe(useFetchObservable, () => {
  const data = ["Response is here"];

  describe("when hook mounts", () => {
    let dummyQuery: () => Observable<string[]>;
    beforeAll(() => {
      dummyQuery = () => from(dummyRequest(data));
    });
    it("is not loading", async () => {
      const { result, waitForNextUpdate } = renderHook(() =>
        useFetchObservable(dummyQuery, initialData)
      );

      expect(result.current.loadingState).toEqual(LoadingState.NOT_LOADED);
      await waitForNextUpdate();
    });

    it("has initial data", async () => {
      const { result, waitForNextUpdate } = renderHook(() =>
        useFetchObservable(dummyQuery, initialData)
      );

      expect(result.current.data).toEqual(initialData);
      await waitForNextUpdate();
    });

    it("does not have error", async () => {
      const { result, waitForNextUpdate } = renderHook(() =>
        useFetchObservable(dummyQuery, initialData)
      );

      expect(result.current.error).toEqual("");
      await waitForNextUpdate();
    });

    describe("when query resolves", () => {
      it("updates data", async () => {
        const { result, waitForNextUpdate } = renderHook(() =>
          useFetchObservable(dummyQuery, initialData)
        );

        await waitForNextUpdate();
        expect(result.current.data).toEqual(data);
      });

      it("is loaded", async () => {
        const { result, waitForNextUpdate } = renderHook(() =>
          useFetchObservable(dummyQuery, initialData)
        );

        await waitForNextUpdate();
        expect(result.current.loadingState).toEqual(LoadingState.LOADED);
      });
    });
  });

  describe("when hook receives updated query", () => {
    let dummyQuery: () => Observable<string[]>;
    let newDummyQuery: () => Observable<string[]>;
    const newData = ["New response"];
    beforeAll(() => {
      dummyQuery = () => {
        const observable = new Observable<string[]>((subscriber) => {
          const timeout = setTimeout(() => subscriber.next(data), 1);
          return () => clearTimeout(timeout);
        });
        return observable;
      };

      newDummyQuery = () => {
        const observable = new Observable<string[]>((subscriber) => {
          const timeout = setTimeout(() => subscriber.next(newData), 1);
          return () => clearTimeout(timeout);
        });
        return observable;
      };
    });

    it("updates data", async () => {
      const { result, rerender, waitForNextUpdate } = renderHook(
        ({ query, initialData }) => useFetchObservable(query, initialData),
        { initialProps: { query: dummyQuery, initialData: initialData } }
      );

      await waitForNextUpdate();
      expect(result.current.data).toEqual(data);
      rerender({ query: newDummyQuery, initialData: [] });

      await waitForNextUpdate();
      expect(result.current.data).toEqual(newData);
    });
  });

  describe("when hook receives updated query before last query has resolved", () => {
    let dummyQuery: () => Observable<string[]>;
    let newDummyQuery: () => Observable<string[]>;
    const newData = ["New response"];
    const spy = jest.fn();
    beforeAll(() => {
      dummyQuery = () => {
        const observable = new Observable<string[]>((subscriber) => {
          const timeout = setTimeout(() => subscriber.next(data), 1);
          return () => {
            clearTimeout(timeout);
            spy();
          };
        });
        return observable;
      };

      newDummyQuery = () => {
        const observable = new Observable<string[]>((subscriber) => {
          const timeout = setTimeout(() => subscriber.next(newData), 1);
          return () => clearTimeout(timeout);
        });
        return observable;
      };
    });
    it("unsubscribes to the old query and has new data", async () => {
      const { result, rerender, waitForNextUpdate } = renderHook(
        ({ query, initialData }) => useFetchObservable(query, initialData),
        { initialProps: { query: dummyQuery, initialData: initialData } }
      );

      rerender({ query: newDummyQuery, initialData: [] });
      expect(spy).toHaveBeenCalledTimes(1);

      await waitForNextUpdate();
      expect(result.current.data).toEqual(newData);
    });
  });

  describe("when hook unmounts", () => {
    let dummyQuery: () => Observable<string[]>;
    const spy = jest.fn();
    beforeAll(() => {
      dummyQuery = () => {
        const observable = new Observable<string[]>((subscriber) => {
          const timeout = setTimeout(() => {
            subscriber.next(data);
          }, 1);
          return () => {
            spy();
            clearTimeout(timeout);
          };
        });
        return observable;
      };
    });

    it("unsubscribes", () => {
      const { unmount } = renderHook(() =>
        useFetchObservable(dummyQuery, initialData)
      );
      unmount();
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});

function dummyRequest(data: string[]) {
  return Promise.resolve(data);
}
