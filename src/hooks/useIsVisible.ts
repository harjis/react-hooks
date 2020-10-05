import {
  MutableRefObject,
  RefCallback,
  useCallback,
  useEffect,
  useRef,
} from "react";

const defaultIntersectionObserverInit: IntersectionObserverInit = {
  root: null,
  rootMargin: "0px",
  threshold: 1.0,
};

export const useIsVisible = <RefElement extends Element>(
  scrollRef: MutableRefObject<RefElement | null>,
  onVisibilityChange: (
    element: RefElement,
    visibilityRatio: number,
    isAbove: boolean
  ) => void
): [RefCallback<RefElement>] => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    return (): void => {
      observerRef.current && observerRef.current.disconnect();
    };
  }, []);

  const observerCallback: RefCallback<RefElement> = useCallback(
    (node) => {
      if (node) {
        observerRef.current = new IntersectionObserver(
          (entries) => {
            if (entries.length) {
              let _isAbove = false;
              if (entries[0].rootBounds) {
                _isAbove =
                  entries[0].boundingClientRect.y < entries[0].rootBounds.y;
              }
              observerRef.current && observerRef.current.unobserve(node);
              onVisibilityChange(node, entries[0].intersectionRatio, _isAbove);
            }
          },
          { ...defaultIntersectionObserverInit, root: scrollRef.current }
        );

        observerRef.current.observe(node);
      }
    },
    [onVisibilityChange, scrollRef]
  );
  return [observerCallback];
};
