import React from 'react';
import { Observable, Subscription } from 'rxjs';

export enum LoadingState {
  NOT_LOADED,
  LOADING,
  LOADED
}

type Query<T> = (...args: any[]) => Observable<T>;
type ReturnType<T> = { data: T; error: string; loadingState: LoadingState };
export default function useFetch<T>(query: Query<T>, initialState: T): ReturnType<T> {
  const [loadingState, setLoading] = React.useState(LoadingState.NOT_LOADED);
  const [data, setData] = React.useState(initialState);
  const [error] = React.useState('');

  React.useEffect(() => {
    let subscription = new Subscription();
    const fetchData = (): void => {
      subscription = query().subscribe(_data => {
        console.log('subscrbie');
        setData(_data);
        setLoading(LoadingState.LOADED);
      });
    };

    fetchData();
    return (): void => {
      console.log('unsubcsc');
      subscription.unsubscribe();
    };
  }, [query]);
  return { data, error, loadingState };
}
