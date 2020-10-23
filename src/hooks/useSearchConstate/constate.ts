import constate from "constate";

import useSearch, { Props, ReturnType } from "../useSearch";

export function creator<T>() {
  return constate<Props<T>, ReturnType<T>, []>(useSearch);
}

