import { creator } from "../../../hooks/useSearchContext";
import { Post } from "../../../types";

function createSearchWithPostsContext() {
  const { SearchProvider, useSearchContext } = creator<Post>();
  return () => ({ SearchProvider, useSearchContext });
}

export const searchWithPostsContextCreator = createSearchWithPostsContext();
