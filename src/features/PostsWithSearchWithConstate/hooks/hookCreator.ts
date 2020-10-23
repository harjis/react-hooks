import { Post } from "../types";
import { creator } from "../../../hooks/useSearchConstate";

function createSearchWithPostsConstate() {
  const [SearchProvider, useSearchContext] = creator<Post>();
  return () => ({ SearchProvider, useSearchContext });
}

export const searchWithPostsConstateCreator = createSearchWithPostsConstate();
