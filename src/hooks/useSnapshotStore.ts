import React from "react";

type GeneratedKeys = { [key: string]: true };
const generatedKeys: GeneratedKeys = {};

export type Props<T> = {
  initialState: T;
  localStorageKey: string;
  persistent?: boolean;
  timeToLive?: number;
};
type ReturnType<T> = {
  state: T;
  save: (state: T) => void;
  remove: () => void;
  verify: () => void;
};
export const useSnapshotStore = <T>({
  initialState,
  localStorageKey,
  persistent = true,
  timeToLive = 1000 * 60 * 60 * 8,
}: Props<T>): ReturnType<T> => {
  const timestampRef = React.useRef<number | null>(null);
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
      if (item) {
        return JSON.parse(item);
      } else {
        localStorage.setItem(localStorageKey, JSON.stringify(initialState));
        return initialState;
      }
    } catch (error) {
      return initialState;
    }
  });

  const save = (state: T) => {
    try {
      setSnapshotState(state);
      localStorage.setItem(localStorageKey, JSON.stringify(state));
      timestampRef.current = Date.now();
    } catch (error) {
      console.log(error);
    }
  };

  const remove = () => {
    localStorage.removeItem(localStorageKey);
    setSnapshotState(initialState);
    delete generatedKeys[localStorageKey];
  };

  const verify = () => {
    const isStale = (): boolean => {
      if (!persistent) {
        return false;
      }
      return (
        timestampRef.current !== null &&
        Date.now() - timeToLive > timestampRef.current
      );
    };
    if (persistent && isStale()) {
      localStorage.removeItem(localStorageKey);
    }
  };

  return { state: snapshotState, save, remove, verify };
};
