import React from "react";

import useResizeObserver from "../hooks/useResizeObserver";
import useHover from "../hooks/useHover";
import { mergeRefs } from "../utils/mergeRefs";

export default {
  title: "ResizeObserver & Hover",
};

export const UseResizeObserverAndHover = () => {
  const [size, setSize] = React.useState({ height: 100, width: 100 });
  const [ref, dimensions] = useResizeObserver<HTMLDivElement>();
  const [ref2, isHovering] = useHover<HTMLDivElement>();
  return (
    <div>
      <button
        onClick={() => {
          setSize((prevState) => ({
            height: prevState.height + 100,
            width: prevState.width + 100,
          }));
        }}
      >
        Increase div size
      </button>
      <div
        style={{ height: size.height, width: size.width }}
        ref={mergeRefs([ref, ref2])}
      >
        height: {dimensions.height} width: {dimensions.width} isHovering:{" "}
        {isHovering.toString()}
      </div>
    </div>
  );
};

UseResizeObserverAndHover.story = { name: "useResizeObserver & useHover" };
