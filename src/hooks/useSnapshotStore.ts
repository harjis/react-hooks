import React from "react";

type GeneratedKeys = { [key: string]: true };
const generatedKeys: GeneratedKeys = {};

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
  React.useEffect(() => {
    if (!generatedKeys[localStorageKey]) {
      generatedKeys[localStorageKey] = true;
    } else {
      throw new Error(
        `Key: ${localStorageKey} is already in use by another hook`
      );
    }

    return () => {
      delete generatedKeys[localStorageKey];
    };
    // Eslint is disabled on purpose for this. The effect registers an id for a hook
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    delete generatedKeys[localStorageKey];
  };

  return { state: snapshotState, onSaveLocalStorage, onRemoveFromLocalStorage };
};
