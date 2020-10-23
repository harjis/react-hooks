import React, { useEffect, useRef } from "react";
import { Observable, Subscription } from "rxjs";

import { LoadingState } from "../types";

type Query<T> = () => Observable<T>;
type ReturnType<T> = {
  data: T;
  error: string;
  loadingState: LoadingState;
  fetch: (query: Query<T>) => Subscription;
};
export default function useFetchObservableCallback<T>(
  initialState: T
): ReturnType<T> {
  const [loadingState, setLoading] = React.useState(LoadingState.NOT_LOADED);
  const [data, setData] = React.useState(initialState);
  const [error] = React.useState("");
  const subscriptionRefs = useRef<Subscription[]>([]);

  useEffect(() => {
    return () =>
      subscriptionRefs.current &&
      subscriptionRefs.current.forEach((subscription) =>
        subscription.unsubscribe()
      );
  }, []);

  const fetch = (query: Query<T>) => {
    const subscription = query()
      .subscribe((_data) => {
        console.log("resolved data", _data);
        setData(_data);
        setLoading(LoadingState.LOADED);
      })
      .add(() => {
        // Whether it's a data or error or even unsubscribe outside of the hook, add will be called.
        // Remove this subscription from current active subscriptions.
        subscriptionRefs.current = subscriptionRefs.current.filter(
          (s) => s !== subscription
        );
      });
    subscriptionRefs.current.push(subscription);
    return subscription;
  };
  return { data, error, loadingState, fetch };
}
