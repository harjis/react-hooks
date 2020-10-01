import React, { PropsWithChildren } from "react";

type BaseItem = {
  id: number;
  name: string;
};
type Props<Item> = {
  items: Item[];
  selectedItem: number;
};

// oof isn't there a better way?
const Input = <Item extends BaseItem>() =>
  React.forwardRef<HTMLDivElement, PropsWithChildren<Props<Item>>>(
    (props: PropsWithChildren<Props<Item>>, ref) => (
      <div>
        {props.items.map((item) => {
          if (item.id === props.selectedItem) {
            return (
              <div ref={ref} style={{ background: "grey" }}>
                {item.name}
              </div>
            );
          } else {
            return <div>{item.name}</div>;
          }
        })}
      </div>
    )
  );
Input.displayName = "Input";
export default Input();
