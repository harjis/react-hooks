import React, { useCallback, useRef } from "react";
import { Observable, Subscription } from "rxjs";

export enum LoadingState {
  NOT_LOADED,
  LOADING,
  LOADED,
}

type Query<T> = () => Observable<T>;
type ReturnType<T> = {
  data: T;
  error: string;
  loadingState: LoadingState;
  fetch: (query: Query<T>) => void;
};
export default function useFetchObservableCallback<T>(
  initialState: T
): ReturnType<T> {
  const [loadingState, setLoading] = React.useState(LoadingState.NOT_LOADED);
  const [data, setData] = React.useState(initialState);
  const [error] = React.useState("");
  let subscription = new Subscription();

  React.useEffect(() => {
    return (): void => {
      console.log("in unsub");
      subscription.unsubscribe();
    };
  }, [subscription]);

  const fetch = (query: Query<T>) => {
    subscription = query().subscribe((_data) => {
      console.log("resolved data", _data);
      setData(_data);
      setLoading(LoadingState.LOADED);
    });
  };
  return { data, error, loadingState, fetch };
}
