import constate from "constate";

import useSearch, { Props, ReturnType } from "../../../hooks/useSearch";
import { Post } from "../types";

function createContexts() {
  return constate<Props<Post>, ReturnType<Post>, []>(useSearch);
}
const SearchContext = createContexts();
export { SearchContext };
