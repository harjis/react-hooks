import React from "react";

import { BulletPointList } from "../../../components/Search";
import { HighlightedTextWithSearch } from "./HighlightedTextWithSearch";
import { Post } from "../types";
import { searchWithPostsContextCreator } from "../hooks/hookCreator";

const itemRenderer = (item: Post) => (
  <HighlightedTextWithSearch text={item.name} />
);
export const BulletPointListWithSearch = () => {
  const { useSearchContext } = searchWithPostsContextCreator();
  const { filteredItems } = useSearchContext();

  return <BulletPointList items={filteredItems} itemRenderer={itemRenderer} />;
};
