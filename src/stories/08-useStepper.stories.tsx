import React, { RefCallback, useRef, useState } from "react";
import List from "../components/List";
import { useIsVisible } from "../hooks/useIsVisible";

export default {
  title: "Stepper",
};
const items = Array.from({ length: 20 }, (x, index) => ({
  id: index,
  name: `Item ${index}`,
}));

export const Stepper = () => {
  const [selectedItem, setSelectedItem] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const refCallback = useIsVisible<HTMLDivElement, HTMLDivElement>(
    scrollRef,
    handleVisibilityChange
  );
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: 250,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div>
          <button
            onClick={() => {
              setSelectedItem((prevState) => prevState + 1);
            }}
          >
            +
          </button>
          <button
            onClick={() => {
              setSelectedItem((prevState) => prevState - 1);
            }}
          >
            -
          </button>
        </div>
        <div>Selected: {selectedItem}</div>
      </div>
      <div ref={scrollRef} style={{ height: 100, overflow: "scroll" }}>
        <List ref={refCallback} items={items} selectedItem={selectedItem} />
      </div>
    </div>
  );
};

function handleVisibilityChange<ElementType extends Element>(
  element: ElementType,
  visibilityRatio: number,
  isIntersectingFromAbove: boolean
): void {
  if (visibilityRatio < 1 && element && isIntersectingFromAbove) {
    // scrollIntoView(alignToTop)
    element.scrollIntoView(true);
  } else if (visibilityRatio < 1 && element && !isIntersectingFromAbove) {
    element.scrollIntoView(false);
  }
}

Stepper.story = {
  name: "component",
};
