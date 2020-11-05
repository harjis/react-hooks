import React, { PropsWithChildren } from "react";

type BaseItem = {
  id: number;
  name: string;
};
type Props<Item> = {
  items: Item[];
  itemRenderer: (item: Item) => React.ReactNode;
};
export const BulletPointList = <I extends BaseItem>(
  props: PropsWithChildren<Props<I>>
) => (
  <ul>
    {props.items.map((item) => (
      <li key={item.id}>{props.itemRenderer(item)}</li>
    ))}
  </ul>
);
