import React from "react";
import { Observable } from "rxjs";

import { LoadingState } from "../types";

type Query<T> = () => Observable<T>;
type ReturnType<T> = { data: T; error: string; loadingState: LoadingState };
export default function useFetchObservable<T>(
  query: Query<T>,
  initialState: T
): ReturnType<T> {
  const [loadingState, setLoading] = React.useState(LoadingState.NOT_LOADED);
  const [data, setData] = React.useState(initialState);
  const [error] = React.useState("");

  React.useEffect(() => {
    setLoading(LoadingState.LOADING);
    const subscription = query().subscribe((_data) => {
      setData(_data);
      setLoading(LoadingState.LOADED);
    });

    return (): void => {
      subscription.unsubscribe();
    };
  }, [query]);
  return { data, error, loadingState };
}
