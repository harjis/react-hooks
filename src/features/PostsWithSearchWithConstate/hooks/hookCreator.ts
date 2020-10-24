import { Post } from "../../../types";
import constate from "constate";
import useSearch, { Props, ReturnType } from "../../../hooks/useSearch";

function createSearchWithPostsConstate() {
  const [SearchProvider, useSearchContext] = constate<
    Props<Post>,
    ReturnType<Post>,
    []
  >(useSearch);
  return { SearchProvider, useSearchContext };
}

export const searchWithPostsConstateCreator = createSearchWithPostsConstate();
