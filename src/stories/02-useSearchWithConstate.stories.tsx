import React from "react";
import {
  SearchInputWithSearch,
  BulletPointListWithSearch,
  searchWithPostsConstateCreator,
  Post,
} from "../features/PostsWithSearchWithConstate";

const posts: Post[] = [
  { id: 1, name: "My favorite post" },
  { id: 2, name: "My least favorite post" },
  { id: 3, name: "Not a post" },
  { id: 4, name: "Lets toast!" },
  { id: 5, name: "I'm at the coast" },
];

export default {
  title: "Search with constate",
};

export const UseSearch = () => {
  const { SearchProvider } = searchWithPostsConstateCreator();

  return (
    <SearchProvider items={posts} itemKey="name">
      <div>
        <SearchInputWithSearch />
        <BulletPointListWithSearch />
      </div>
    </SearchProvider>
  );
};

UseSearch.story = {
  name: "useSearch with highlighting",
};
