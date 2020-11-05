import React from "react";
import {
  SearchInputWithSearch,
  BulletPointListWithSearch,
  searchWithPostsConstateCreator,
} from "../features/PostsWithSearchWithConstate";
import useFetchObservable from "../hooks/useFetchObservable";
import Loading from "../components/Loading";
import { getPosts } from "../api/posts";

export default {
  title: "Search with constate",
};

export const UseSearch = () => {
  const { SearchProvider } = searchWithPostsConstateCreator;
  const { data: posts, error, loadingState } = useFetchObservable(getPosts, []);
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
