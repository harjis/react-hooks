import React, { useRef, useState } from "react";
import { Story } from "@storybook/react";

import List from "../components/List";
import { useHotkeys } from "../hooks/useHotkeys";
import { useIsVisible } from "../hooks/useIsVisible";
import { scrollIntoView } from "../utils/scrollIntoView";

export default {
  title: "useHotkeys with List",
};
const items = Array.from({ length: 20 }, (x, index) => ({
  id: index,
  name: `Item ${index}`,
}));

const HotkeysWithList = () => {
  const [selectedItem, setSelectedItem] = useState(0);

  const scrollRef = useRef<HTMLDivElement>(null);
  const refCallback = useIsVisible<HTMLDivElement, HTMLDivElement>(
    scrollRef,
    scrollIntoView
  );

  // useMemo so that useHotkeys refCallback doesn't cleanup on
  // every render
  const eventListeners = React.useMemo(
    () => [
      {
        keys: ["ArrowUp", "ArrowDown"],
        eventListener: (event: KeyboardEvent) => {
          if (event.key === "ArrowDown") {
            setSelectedItem((prevState) => prevState + 1);
          } else if (event.key === "ArrowUp") {
            setSelectedItem((prevState) => prevState - 1);
          }
        },
      },
    ],
    []
  );
  const ref = useHotkeys({
    autoFocus: true,
    eventListeners,
  });
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: 250,
      }}
    >
      <div
        ref={ref}
        tabIndex={0}
        style={{ display: "flex", flexDirection: "column" }}
      >
        Press Up and Down arrow keys!
        <div>Selected: {selectedItem}</div>
      </div>
      <div ref={scrollRef} style={{ height: 100, overflow: "scroll" }}>
        <List ref={refCallback} items={items} selectedItem={selectedItem} />
      </div>
    </div>
  );
};

const Template: Story = (args) => {
  return <HotkeysWithList />;
};

export const Basic = Template.bind({});
Basic.args = {};
