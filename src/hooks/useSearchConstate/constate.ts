import constate from "constate";

import useSearch, { Props, ReturnType } from "../useSearch";

function createContexts<T>() {
  return constate<Props<T>, ReturnType<T>, []>(useSearch);
}
const SearchContext = createContexts();
export { SearchContext };
