import React, { PropsWithChildren } from "react";
import Highlighter from "react-highlight-words";

import { SearchContext } from "../../hooks/useSearch";

type BaseItem = {
  id: number;
  name: string;
};
type Props<Item> = {
  items: Item[];
  search: string;
};
export const BulletPointList = <I extends BaseItem>(
  props: PropsWithChildren<Props<I>>
) => (
  <ul>
    {props.items.map((item) => (
      <li key={item.id}>
        <Highlighter searchWords={[props.search]} textToHighlight={item.name} />
      </li>
    ))}
  </ul>
);

export function BulletPointListWithConstate() {
  const [, useSearchContext] = SearchContext;
  const { filteredItems, search } = useSearchContext();

  // How do you make this work with generics? :<
  return <BulletPointList items={filteredItems} search={search} />;
}
