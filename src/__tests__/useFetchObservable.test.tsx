import { renderHook } from "@testing-library/react-hooks";
import { from, Observable, Subject, Subscription } from "rxjs";

import useFetchObservable, { LoadingState } from "../hooks/useFetchObservable";

const initialData: string[] = [];
describe(useFetchObservable, () => {
  describe("when hook mounts", () => {
    let dummyQuery: () => Observable<string[]>;
    beforeAll(() => {
      dummyQuery = () => from(dummyRequest());
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
  });

  describe("when hook unmounts", () => {
    let dummyQuery: () => Observable<string[]>;
    const spy = jest.fn();
    beforeAll(() => {
      dummyQuery = () => {
        const observable = new Observable<string[]>((subscriber) => {
          const timeout = setTimeout(() => {
            subscriber.next(["str"]);
          }, 100);
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

function dummyRequest() {
  return Promise.resolve(["Response is here"]);
}
