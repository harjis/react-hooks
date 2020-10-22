import React from "react";

import useWindowPosition from "../hooks/useWindowPosition";
import useRelativePosition from "../hooks/useRelativePosition";

export default {
  title: "Position",
};

export const UsePosition = () => {
  const coordinates = useWindowPosition();
  return (
    <div>
      x: {coordinates.x} y: {coordinates.y}
    </div>
  );
};

UsePosition.story = { name: "WindowPosition - Part 1" };

export const UsePosition2 = () => {
  const { state: htmlState, onMove: htmlOnMove } = useRelativePosition();
  const { state: svgState, onMove: svgOnMove } = useRelativePosition();

  return (
    <div>
      <div
        style={{ border: "1px solid", height: 200, width: 200 }}
        onMouseMove={htmlOnMove}
      >
        x: {htmlState.x} y: {htmlState.y}
      </div>
      <svg
        style={{ border: "1px solid", height: 200, width: 200 }}
        onMouseMove={svgOnMove}
      >
        <text x={0} y={20}>
          x: {svgState.x}
        </text>
        <text x={0} y={40}>
          y: {svgState.y}
        </text>
      </svg>
    </div>
  );
};

UsePosition2.story = { name: "RelativePosition - Part 2" };
