import React, { useCallback, useEffect, useRef } from "react";
import ResizeObserver from "resize-observer-polyfill";

type Dimensions = {
  height: number;
  width: number;
};
type ReturnType<ElementType> = [React.Ref<ElementType>, Dimensions];

const useResizeObserver = <
  ElementType extends Element
>(): ReturnType<ElementType> => {
  const observerRef = useRef<ResizeObserver | null>(null);
  const [dimensions, setDimensions] = React.useState({ height: 0, width: 0 });
  const elementRef = React.useRef<ElementType | null>(null);

  const unobserve = useCallback(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }
  }, []);

  const observe = useCallback(() => {
    if (elementRef.current) {
      observerRef.current = new ResizeObserver(([entry]) => {
        const { contentRect } = entry;
        const width = contentRect.left + contentRect.right;
        const height = contentRect.top + contentRect.bottom;

        setDimensions({ height, width });
      });
      observerRef.current.observe(elementRef.current);
    }
  }, []);

  useEffect(() => {
    observe();
    return () => {
      unobserve();
    };
  }, [observe, unobserve]);

  const setRef = useCallback(
    (node: ElementType | null) => {
      if (elementRef.current) {
        unobserve();
      }
      elementRef.current = node;
      if (node) {
        observe();
      }
    },
    [observe, unobserve]
  );

  return [setRef, dimensions];
};

export default useResizeObserver;
