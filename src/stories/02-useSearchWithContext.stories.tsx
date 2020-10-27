import React from "react";

import { PostsWithSearch } from "../features/PostsWithSearch/components";

export default {
  title: "Search with context",
};

export const UseSearch = () => <PostsWithSearch />;

UseSearch.story = {
  name: "useSearch with highlighting",
};
