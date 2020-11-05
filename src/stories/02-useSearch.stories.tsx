import React from "react";

import useSearch from "../hooks/useSearch";
import { BulletPointList, SearchInput } from "../components/Search";

type Post = {
  id: number;
  name: string;
};

const data = new Map<"posts" | "newPosts", Post[]>([
  [
    "posts",
    [
      { id: 1, name: "My favorite post" },
      { id: 2, name: "My least favorite post" },
      { id: 3, name: "Not a post" },
      { id: 4, name: "Lets toast!" },
      { id: 5, name: "I'm at the coast" },
    ],
  ],
  [
    "newPosts",
    [
      { id: 1, name: "My favorite post" },
      { id: 2, name: "Cat picture" },
      { id: 3, name: "Dog picture" },
      { id: 4, name: "Wat" },
    ],
  ],
]);

export default {
  title: "Search",
};

export const UseSearch = () => {
  const [whichPosts, setWhichPosts] = React.useState<"posts" | "newPosts">(
    "posts"
  );
  const { search, filteredItems, onSearch } = useSearch({
    items: data.get(whichPosts) as Post[], // drop typechecking
    itemKey: "name",
  });
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: 500,
      }}
    >
      <button
        onClick={() =>
          setWhichPosts((prevState) =>
            prevState === "posts" ? "newPosts" : "posts"
          )
        }
      >
        Switch items
      </button>
      <div>
        <SearchInput onSearch={onSearch} value={search} />
      </div>
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
