import React from "react";

import useResizeObserver from "../hooks/useResizeObserver";

export default {
  title: "ResizeObserver",
};

export const UseResizeObserver = () => {
  const [size, setSize] = React.useState({ height: 100, width: 100 });
  const [ref, dimensions] = useResizeObserver<HTMLDivElement>();
  const [ref2, dimensions2] = useResizeObserver<HTMLDivElement>();
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
        style={{
          height: size.height,
          width: size.width,
          backgroundColor: "aliceblue",
        }}
        ref={ref}
      >
        height: {dimensions.height} width: {dimensions.width}
      </div>

      <div
        style={{ height: 200, width: 250, backgroundColor: "pink" }}
        ref={ref2}
      >
        height: {dimensions2.height} width: {dimensions2.width}
      </div>
    </div>
  );
};

UseResizeObserver.story = { name: "useResizeObserver" };
