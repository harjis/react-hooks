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
  fetch: () => void;
};
export default function useFetchObservableCallback<T>(
  query: Query<T>,
  initialState: T
): ReturnType<T> {
  const [loadingState, setLoading] = React.useState(LoadingState.NOT_LOADED);
  const [data, setData] = React.useState(initialState);
  const [error] = React.useState("");
  let subscription = new Subscription();

  React.useEffect(() => {
    return (): void => {
      subscription.unsubscribe();
    };
  }, [subscription]);

  const fetch = useCallback(() => {
    subscription = query().subscribe((_data) => {
      setData(_data);
      setLoading(LoadingState.LOADED);
    });
  }, [query]);
  return { data, error, loadingState, fetch };
}
