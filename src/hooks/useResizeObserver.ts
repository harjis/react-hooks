import React from "react";
import ResizeObserver from "resize-observer-polyfill";

type Dimensions = {
  height: number;
  width: number;
};
type ReturnType<ElementType> = [React.RefObject<ElementType>, Dimensions];
const useResizeObserver = <ElementType extends Element>(): ReturnType<
  ElementType
> => {
  const [dimensions, setDimensions] = React.useState({ height: 0, width: 0 });
  const ref = React.useRef<ElementType>(null);

  React.useEffect(() => {
    const { current } = ref;
    const observer = new ResizeObserver(([element]) => {
      // https://alligator.io/js/resize-observer/
      // Unlike with an element’s getBoundingClientRect, contentRect’s values for width and height don’t
      // include padding values. contentRect.top is the element’s top padding
      // and contentRect.left is the element’s left padding.
      const width = element.contentRect.left + element.contentRect.right;
      const height = element.contentRect.top + element.contentRect.bottom;

      setDimensions({ height, width });
    });

    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [ref]);

  return [ref, dimensions];
};

export default useResizeObserver;
