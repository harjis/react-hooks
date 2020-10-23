import { Post } from "../types";
import { creator } from "../../../hooks/useSearchContext";

function createSearchWithPostsContext() {
  const { SearchProvider, useSearchContext } = creator<Post>();
  return () => ({ SearchProvider, useSearchContext });
}

export const searchWithPostsContextCreator = createSearchWithPostsContext();
