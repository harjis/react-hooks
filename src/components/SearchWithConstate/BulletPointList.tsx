import React, { PropsWithChildren } from "react";

import { SearchContext } from "../../hooks/useSearch";
import { HighlightedTextWithSearch } from "./HighlightedText";

type BaseItem = {
  id: number;
  name: string;
};
type Props<Item> = {
  items: Item[];
};
export const BulletPointList = <I extends BaseItem>(
  props: PropsWithChildren<Props<I>>
) => (
  <ul>
    {props.items.map((item) => (
      <li key={item.id}>
        <HighlightedTextWithSearch text={item.name} />
      </li>
    ))}
  </ul>
);

export function BulletPointListWithSearch() {
  const [, useSearchContext] = SearchContext;
  const { filteredItems } = useSearchContext();

  // How do you make this work with generics? :<
  return <BulletPointList items={filteredItems} />;
}
