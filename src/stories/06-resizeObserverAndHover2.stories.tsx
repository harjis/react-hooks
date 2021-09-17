import React from "react";

import useResizeObserver from "../hooks/useResizeObserver";
import useHover2 from "./06-useHoverImplementation";

export default {
  title: "ResizeObserver & Hover 2 (disabled)",
};

// The code here is commented out on purpose. When this story was written useResizeObserver
// returned RefObject which could be passed into useHover2 as function arguments.
// From that the implementation has changed so that useResizeObserver returns RefCallback
// because it has the ability to react on ref changes. That change has broken this story
// and to my understanding this can not be solved since we can't easily access the element
// inside useHover2 when RefCallback is used
const UseResizeObserverAndHover = () => {
  const [size, setSize] = React.useState({ height: 100, width: 100 });
  const [ref, dimensions] = useResizeObserver<HTMLDivElement>();
  // Can't pass ref anymore
  // const [, isHovering] = useHover2(ref);
  const isHovering = false;
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
      <div style={{ height: size.height, width: size.width }} ref={ref}>
        height: {dimensions.height} width: {dimensions.width} isHovering:{" "}
        {isHovering.toString()}
      </div>
    </div>
  );
};

export const Temp = () => {
  return (
    <div>Check the story file comments on why this story has been disabled</div>
  );
};
Temp.story = { name: "useResizeObserver & useHover" };
