import React from "react";

import { SearchContext } from "../hooks/useSearch";
import {
  BulletPointListWithSearch,
  SearchInputWithSearch,
} from "../components/SearchWithConstate";

type Post = {
  id: number;
  name: string;
};
const posts: Post[] = [
  { id: 1, name: "My favorite post" },
  { id: 2, name: "My least favorite post" },
  { id: 3, name: "Not a post" },
  { id: 4, name: "Lets toast!" },
  { id: 5, name: "I'm at the coast" },
];

export default {
  title: "Search with highlighting",
};

export const UseSearch = () => {
  const [SearchProvider] = SearchContext;

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
