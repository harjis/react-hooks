import React from 'react';

import useHover from '../hooks/useHover';

export default {
  title: 'Hover'
};

export const UseHover = () => {
  const [ref1, isHovering1] = useHover<HTMLDivElement>();
  const [ref2, isHovering2] = useHover<SVGSVGElement>();

  return (
    <div style={{ display: 'flex' }}>
      <div ref={ref1} style={{ border: '1px solid', height: 200, width: 200 }}>
        Div: isHovering {`${isHovering1}`}
      </div>
      <svg ref={ref2} style={{ border: '1px solid', height: 200, width: 200 }}>
        <text x={0} y={15}>
          Svg: isHovering {`${isHovering2}`}
        </text>
      </svg>
    </div>
  );
};

UseHover.story = {
  name: 'useHover'
};
