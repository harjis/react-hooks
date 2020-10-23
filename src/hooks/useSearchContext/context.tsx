import React, { createContext } from "react";

import useSearch, { Props, ReturnType, initialState } from "./../useSearch";

function createUseCtx<T>(context: React.Context<T>) {
  return () => {
    return React.useContext<T>(context);
  };
}

export function creator<T>() {
  const context = createContext<ReturnType<T>>(initialState);
  const useSearchContext = createUseCtx(context);

  const SearchProvider: React.FC<Props<T>> = (props) => {
    const { children, ...rest } = props;
    const { Provider } = context;
    const useSearchHook = useSearch(rest);
    return <Provider value={useSearchHook}>{children}</Provider>;
  };

  return { SearchProvider, useSearchContext };
}
