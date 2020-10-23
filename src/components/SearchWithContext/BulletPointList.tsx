import React, { PropsWithChildren, useContext } from "react";

import { store } from "../../hooks/useSearchContext";
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
  const { filteredItems } = useContext(store);

  // How do you make this work with generics? :<
  return <BulletPointList items={filteredItems} />;
}
