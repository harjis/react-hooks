import { creator } from "../../../hooks/useSearchConstate";
import { Post } from "../../../types";

function createSearchWithPostsConstate() {
  const [SearchProvider, useSearchContext] = creator<Post>();
  return () => ({ SearchProvider, useSearchContext });
}

export const searchWithPostsConstateCreator = createSearchWithPostsConstate();
