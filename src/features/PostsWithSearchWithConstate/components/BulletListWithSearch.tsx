import React from "react";

import { BulletPointList } from "../../../components/Search";
import { HighlightedTextWithSearch } from "./HighlightedTextWithSearch";
import { searchWithPostsConstateCreator } from "../hooks/hookCreator";
import { Post } from "../../../types";

const itemRenderer = (item: Post) => (
  <HighlightedTextWithSearch text={item.name} />
);

export function BulletPointListWithSearch() {
  const { useSearchContext } = searchWithPostsConstateCreator;
  const { filteredItems } = useSearchContext();

  // TODO: How do you make this work with generics? :< filteredItems is any
  return <BulletPointList items={filteredItems} itemRenderer={itemRenderer} />;
}
