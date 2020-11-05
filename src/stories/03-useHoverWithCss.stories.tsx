import React from "react";

import "./HoverWithCss.css";

export default {
  title: "Hover-with-css",
};

export const UseHoverWithCss = () => {
  return (
    <div style={{ display: "flex" }}>
      <div
        className="container"
        style={{ border: "1px solid", height: 200, width: 200 }}
      >
        Div: isHovering <span className="hoverYes">true</span>
        <span className="hoverNo">false</span>
      </div>

      <svg
        className="container"
        style={{ border: "1px solid", height: 200, width: 200 }}
      >
        <text x={0} y={15}>
          Svg: isHovering
        </text>
        <text x={110} y={15} className="hoverYes">
          true
        </text>
        <text x={110} y={15} className="hoverNo">
          false
        </text>
      </svg>
    </div>
  );
};

UseHoverWithCss.story = {
  name: "with css",
};
