import React from "react";

import Loading from "../components/Loading";
import useFetchObservable from "../hooks/useFetchObservable";
import {
  BulletPointListWithSearch,
  SearchInputWithSearch,
  searchWithPostsContextCreator,
} from "../features/PostsWithSearch";
import { getPosts } from "../features/PostsWithSearch/api/posts";
import { Post } from "../types";

export default {
  title: "Search with context",
};

export const UseSearch = () => {
  const { SearchProvider } = searchWithPostsContextCreator();
  const { data: posts, error, loadingState } = useFetchObservable<Post[]>(
    getPosts,
    []
  );
  return (
    <SearchProvider items={posts} itemKey="name">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: 500,
        }}
      >
        <div>
          <SearchInputWithSearch />
        </div>
        <Loading loadingState={loadingState} error={error}>
          <BulletPointListWithSearch />
        </Loading>
      </div>
    </SearchProvider>
  );
};

UseSearch.story = {
  name: "useSearch with highlighting",
};
