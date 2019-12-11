import React from 'react';

// import useWindowPosition from '../hooks/useWindowPosition';
// import useRelativePosition from '../hooks/useRelativePosition';

export default {
  title: 'Position'
};

export const UsePosition = () => {
  return <div>Show a div which shows mouse position in window here</div>;
};

UsePosition.story = { name: 'WindowPosition - Part 1' };

export const UsePosition2 = () => {
  return (
    <div>Show 2 divs which shows relative mouse position if the cursor is inside the element</div>
  );
};

UsePosition2.story = { name: 'RelativePosition - Part 2' };
