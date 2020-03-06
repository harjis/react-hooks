import React from "react";

import useResizeObserver from "../hooks/useResizeObserver";
import useHover2 from "./06-useHoverImplementation";

export default {
  title: "ResizeObserver & Hover 2"
};

export const UseResizeObserverAndHover = () => {
  const [size, setSize] = React.useState({ height: 100, width: 100 });
  const [ref, dimensions] = useResizeObserver<HTMLDivElement>();
  const [, isHovering] = useHover2(ref);
  return (
    <div>
      <button
        onClick={() => {
          setSize(prevState => ({
            height: prevState.height + 100,
            width: prevState.width + 100
          }));
        }}
      >
        Increase div size
      </button>
      <div style={{ height: size.height, width: size.width }} ref={ref}>
        height: {dimensions.height} width: {dimensions.width} isHovering: {isHovering.toString()}
      </div>
    </div>
  );
};

UseResizeObserverAndHover.story = { name: "useResizeObserver & useHover" };
