import React, { createContext, PropsWithChildren } from "react";

import useSearchContext, {
  Props,
  ReturnType,
  initialState,
} from "./useSearchContext";

const store = createContext(initialState);
const { Provider } = store;

const SearchProvider = <T extends Record<string, unknown>>(
  props: PropsWithChildren<Props<T>>
) => {
  const { children, ...rest } = props;
  const search = useSearchContext(rest);
  // TODO fix this
  return <Provider value={search}>{children}</Provider>;
};

export { store, SearchProvider };
