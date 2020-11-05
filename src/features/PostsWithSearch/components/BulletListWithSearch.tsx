import React from "react";

import { BulletPointList } from "../../../components/Search";
import { HighlightedTextWithSearch } from "./HighlightedTextWithSearch";
import { searchWithPostsContextCreator } from "../hooks/hookCreator";
import { Post } from "../../../types";

const itemRenderer = (item: Post) => (
  <HighlightedTextWithSearch text={item.name} />
);
export const BulletPointListWithSearch = () => {
  const { useSearchContext } = searchWithPostsContextCreator;
  const { filteredItems } = useSearchContext();

  return <BulletPointList items={filteredItems} itemRenderer={itemRenderer} />;
};
