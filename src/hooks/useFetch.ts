import React from 'react';

export enum LoadingState {
  NOT_LOADED,
  LOADING,
  LOADED
}

type Query<T> = () => Promise<T>;
type ReturnType<T> = { data: T; error: string; loadingState: LoadingState };
export default function useFetch<T>(query: Query<T>, initialState: T): ReturnType<T> {
  const [loadingState, setLoading] = React.useState(LoadingState.NOT_LOADED);
  const [data, setData] = React.useState<T>(initialState);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    let isMounted = true;
    const fetchData = (): void => {
      if (isMounted) setLoading(LoadingState.LOADING);
      query()
        .then(_data => {
          if (isMounted) {
            setData(_data);
            setLoading(LoadingState.LOADED);
          }
        })
        .catch(e => {
          if (isMounted) {
            setError(e);
            setLoading(LoadingState.LOADED);
          }
        });
    };

    fetchData();
    return (): void => {
      isMounted = false;
    };
  }, [query]);
  return { data, error, loadingState };
}
