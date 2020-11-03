import React from "react";

export type Props<T> = {
  initialState: T;
  localStorageKey: string;
};
type ReturnType<T> = {
  state: T;
  onSaveLocalStorage: (state: T) => void;
  onRemoveFromLocalStorage: () => void;
};
export const useSnapshotStore = <T>({
  initialState,
  localStorageKey,
}: Props<T>): ReturnType<T> => {
  const [snapshotState, setSnapshotState] = React.useState(() => {
    try {
      const item = localStorage.getItem(localStorageKey);
      return item ? JSON.parse(item) : initialState;
    } catch (error) {
      return initialState;
    }
  });

  const onSaveLocalStorage = (state: T) => {
    try {
      setSnapshotState(state);
      localStorage.setItem(localStorageKey, JSON.stringify(state));
    } catch (error) {
      console.log(error);
    }
  };

  const onRemoveFromLocalStorage = () => {
    localStorage.removeItem(localStorageKey);
  };

  return { state: snapshotState, onSaveLocalStorage, onRemoveFromLocalStorage };
};
