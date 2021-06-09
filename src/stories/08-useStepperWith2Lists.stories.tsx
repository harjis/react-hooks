import React, { RefCallback, useRef, useState } from "react";
import List from "../components/List";
import { useIsVisible } from "../hooks/useIsVisible";

export default {
  title: "Stepper with 2 lists",
};
const items = Array.from({ length: 20 }, (x, index) => ({
  id: index,
  name: `Item ${index}`,
}));

export const Stepper = () => {
  const [selectedItem, setSelectedItem] = useState(0);
  const secondScrollRef = useRef<HTMLDivElement>(null);
  const [refCallback, scrollRef] = useIsVisible<HTMLDivElement, HTMLDivElement>(
    (element, visibilityRatio, isAbove) =>
      handleVisibilityChange(
        element,
        visibilityRatio,
        isAbove,
        secondScrollRef.current
      )
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

      <div ref={secondScrollRef} style={{ height: 100, overflow: "scroll" }}>
        <List items={items} selectedItem={selectedItem} />
      </div>
    </div>
  );
};

function handleVisibilityChange<ElementType extends Element>(
  element: ElementType,
  visibilityRatio: number,
  isAbove: boolean,
  secondScrollRef: ElementType | null
): void {
  const id = element.getAttribute("data-id");
  const syncHere = secondScrollRef
    ? secondScrollRef.querySelector(`[data-id="${id}"]`)
    : null;

  if (visibilityRatio < 1 && element && isAbove) {
    element.scrollIntoView();
    syncHere && syncHere.scrollIntoView();
  } else if (visibilityRatio < 1 && element && !isAbove) {
    element.scrollIntoView(false);
    syncHere && syncHere.scrollIntoView(false);
  }
}

Stepper.story = {
  name: "component",
};
