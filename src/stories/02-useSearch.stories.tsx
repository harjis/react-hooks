import React from "react";

import useSearch from "../hooks/useSearch";
import { BulletPointList, SearchInput } from "../components/Search";

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
  title: "Search",
};

export const UseSearch = () => {
  const { search, filteredItems, onSearch } = useSearch({
    items: posts,
    itemKey: "name",
  });
  return (
    <div>
      <SearchInput onSearch={onSearch} value={search} />
      <BulletPointList
        items={filteredItems}
        itemRenderer={(item) => item.name}
      />
    </div>
  );
};

UseSearch.story = {
  name: "useSearch",
};
