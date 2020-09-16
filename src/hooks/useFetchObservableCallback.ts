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
  const subscription = useRef(new Subscription());

  React.useEffect(() => {
    return (): void => {
      subscription.current.unsubscribe();
    };
    // Maybe this is more clear without subscription as a dep since the dependency doesn't actually do anything
    // This effects cleanup is done only on unmount. Conscutive calls unsubscriptions on fetch are handled by fetch it self
  }, []);

  const fetch = useCallback(() => {
    subscription.current.unsubscribe();
    subscription.current = new Subscription();
    subscription.current.add(
      query().subscribe((_data) => {
        setData(_data);
        setLoading(LoadingState.LOADED);
      })
    );
  }, [query]);
  return { data, error, loadingState, fetch };
}
