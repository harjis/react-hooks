import React, { useCallback, useEffect, useRef } from "react";
import ResizeObserver from "resize-observer-polyfill";

type Dimensions = {
  height: number;
  width: number;
};
type ReturnType<ElementType> = [React.Ref<ElementType>, Dimensions];
const useResizeObserver = <ElementType extends Element>(): ReturnType<
  ElementType
> => {
  const observerRef = useRef<ResizeObserver | null>(null);
  const [dimensions, setDimensions] = React.useState({ height: 0, width: 0 });
  const elementRef = React.useRef<ElementType | null>(null);

  const unobserve = useCallback(() => {
    observerRef.current?.disconnect();
    observerRef.current = null;
  }, []);

  const observe = useCallback(() => {
    const { current } = elementRef;
    if (current) {
      observerRef.current = new ResizeObserver(([element]) => {
        // https://alligator.io/js/resize-observer/
        // Unlike with an element’s getBoundingClientRect, contentRect’s values for width and height don’t
        // include padding values. contentRect.top is the element’s top padding
        // and contentRect.left is the element’s left padding.
        const width = element.contentRect.left + element.contentRect.right;
        const height = element.contentRect.top + element.contentRect.bottom;

        setDimensions({ height, width });
      });

      observerRef.current?.observe(current);
    }
  }, []);

  useEffect(() => {
    return (): void => {
      unobserve();
    };
  }, [unobserve]);

  const init = useCallback(() => {
    unobserve();
    observe();
  }, [observe, unobserve]);

  const elementRefCallBack = useCallback(
    (node) => {
      elementRef.current = node;
      init();
    },
    [init]
  );

  return [elementRefCallBack, dimensions];
};

export default useResizeObserver;
