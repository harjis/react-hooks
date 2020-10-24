import { Post } from "../../../types";
import { createContext } from "../../../hooks/contextCreator";
import useSearch, {
  initialState,
  Props,
  ReturnType,
} from "../../../hooks/useSearch";

function createSearchWithPostsContext() {
  const {
    Provider: SearchProvider,
    useContext: useSearchContext,
  } = createContext<Props<Post>, ReturnType<Post>>(useSearch, initialState);
  return () => ({ SearchProvider, useSearchContext });
}

export const searchWithPostsContextCreator = createSearchWithPostsContext();
