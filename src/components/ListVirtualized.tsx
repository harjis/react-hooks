import React, { PropsWithChildren } from "react";
import { List } from "react-virtualized";

const rowRenderer = <Item extends BaseItem>(
  item: Item,
  selectedItem: number
) => (
  <div
    key={item.id}
    style={{ background: item.id === selectedItem ? "grey" : undefined }}
  >
    {item.name}
  </div>
);
type BaseItem = {
  id: number;
  name: string;
};
type Props<Item> = {
  items: Item[];
  selectedItem: number;
};
const ListVirtualized = <Item extends BaseItem>(
  props: PropsWithChildren<Props<Item>>
) => (
  <List
    width={50}
    height={100}
    rowCount={props.items.length}
    rowHeight={19.2}
    scrollToIndex={props.selectedItem}
    rowRenderer={({ index }) =>
      rowRenderer(props.items[index], props.selectedItem)
    }
  />
);

export default ListVirtualized;
