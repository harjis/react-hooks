import React from "react";

import Loading from "../../../components/Loading";
import useFetchObservable from "../../../hooks/useFetchObservable";
import { BulletPointListWithSearch } from "./BulletListWithSearch";
import { getPosts } from "../../../api/posts";
import { SearchInputWithSearch } from "./SearchInput";
import { searchWithPostsContextCreator } from "../hooks/hookCreator";

export const PostsWithSearch = () => {
  const { SearchProvider } = searchWithPostsContextCreator;
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
