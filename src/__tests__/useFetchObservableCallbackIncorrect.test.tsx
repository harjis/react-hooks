import { Observable } from "rxjs";
import { renderHook } from "@testing-library/react-hooks";
import { act } from "react-dom/test-utils";

import useFetchObservableCallback from "../hooks/useFetchObservableCallbackIncorrect";

const initialData: string[] = [];
describe(useFetchObservableCallback, () => {
  describe("when hook receives updated query before last query has resolved", () => {
    const data = ["Response is here"];
    let firstQuery: () => Observable<string[]>;
    let secondQuery: () => Observable<string[]>;
    const newData = ["New response"];
    const spy = jest.fn();
    beforeAll(() => {
      firstQuery = () => {
        const observable = new Observable<string[]>((subscriber) => {
          const timeout = setTimeout(() => subscriber.next(data), 100);
          return () => {
            clearTimeout(timeout);
            spy();
          };
        });
        return observable;
      };

      secondQuery = () => {
        const observable = new Observable<string[]>((subscriber) => {
          const timeout = setTimeout(() => subscriber.next(newData), 1);
          return () => clearTimeout(timeout);
        });
        return observable;
      };
    });
    it("unsubscribes to the old query and has new data", async () => {
      const { result, rerender, waitForNextUpdate } = renderHook(
        ({ initialData }) => useFetchObservableCallback(initialData),
        { initialProps: { initialData: initialData } }
      );

      act(() => {
        result.current.fetch(firstQuery);
      });

      rerender({ initialData: [] });
      // TODO: Clean up is not handled properly! This should be uncommented
      // expect(spy).toHaveBeenCalledTimes(1);

      act(() => {
        result.current.fetch(secondQuery);
      });

      await waitForNextUpdate();
      expect(result.current.data).toEqual(newData);

      await waitForNextUpdate();
      // TODO This should succeed. Instead result.current.data === data
      expect(result.current.data).toEqual(newData);
    });
  });
});
