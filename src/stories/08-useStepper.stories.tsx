import React, { useCallback, useRef, useState } from "react";
import List from "../components/List";
import { useIsVisible } from "../hooks/useIsVisible";
import { scrollIntoView } from "../utils/scrollIntoView";
import { useHasScrolled } from "../hooks/useHasScrolled";
import { mergeRefs } from "../utils/mergeRefs";

export default {
  title: "Stepper",
};
const items = Array.from({ length: 20 }, (x, index) => ({
  id: index,
  name: `Item ${index}`,
}));

export const Stepper = () => {
  const [selectedItem, setSelectedItem] = useState(0);
  const [scrollRef2, hasScrolled, resetHasScrolled] =
    useHasScrolled<HTMLDivElement>();
  const scrollIntoView2 = useCallback(
    (element, visibilityRatio, isIntersectingFromAbove) => {
      if (hasScrolled) return;
      scrollIntoView(element, visibilityRatio, isIntersectingFromAbove);
    },
    [hasScrolled]
  );
  const [refCallback, scrollRefCallback] = useIsVisible<
    HTMLDivElement,
    HTMLDivElement
  >(scrollIntoView2);

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
              resetHasScrolled();
            }}
          >
            +
          </button>
          <button
            onClick={() => {
              setSelectedItem((prevState) => prevState - 1);
              resetHasScrolled();
            }}
          >
            -
          </button>
        </div>
        <div>Selected: {selectedItem}</div>
      </div>
      <div
        ref={mergeRefs([scrollRefCallback, scrollRef2])}
        style={{ height: 100, overflow: "scroll" }}
      >
        <List ref={refCallback} items={items} selectedItem={selectedItem} />
      </div>
    </div>
  );
};

Stepper.story = {
  name: "component",
};
