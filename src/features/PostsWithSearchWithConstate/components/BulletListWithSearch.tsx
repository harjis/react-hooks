import React from "react";

import { BulletPointList } from "../../../components/Search";
import { HighlightedTextWithSearch } from "./HighlightedTextWithSearch";
import { Post } from "../../PostsWithSearch/types";
import { SearchContext } from "../hooks/hookCreator";

const itemRenderer = (item: Post) => (
  <HighlightedTextWithSearch text={item.name} />
);

export function BulletPointListWithSearch() {
  const [, useSearchContext] = SearchContext;
  const { filteredItems } = useSearchContext();

  // How do you make this work with generics? :<
  return <BulletPointList items={filteredItems} itemRenderer={itemRenderer} />;
}
