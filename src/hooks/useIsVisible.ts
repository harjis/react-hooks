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

export const useIsVisible = <
  RefElement extends Element,
  ScrollRefElement extends Element
>(
  scrollRef: MutableRefObject<ScrollRefElement | null>,
  onVisibilityChange: (
    element: RefElement,
    visibilityRatio: number,
    isIntersectingFromAbove: boolean
  ) => void
): [RefCallback<RefElement>] => {
  // | null is needed because we own the ref.
  // More info here: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/31065#issuecomment-446425911
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    return (): void => {
      observerRef.current && observerRef.current.disconnect();
    };
  }, []);

  // Do I need to assign currentScrollRef in a variable? If I didn't, I guess it wouldn't handle
  // cases where scroll ref changed
  const { current: currentScrollRef } = scrollRef;
  const observerCallback: RefCallback<RefElement> = useCallback(
    (node) => {
      if (node) {
        observerRef.current = new IntersectionObserver(
          (entries) => {
            if (entries.length) {
              //  Documentation: https://www.w3.org/TR/intersection-observer/#dom-intersectionobserverentry-rootbounds
              //  It states that rootBounds is a Rect if:
              //    If target belongs to the same unit of related similar-origin browsing contexts
              //    as the intersection root, this will be the root intersection rectangle.
              //    Otherwise, this will be null.
              //
              //  I have no idea what this means but I guess in that case the element is not intersecting?
              //  -> isIntersectingFromAbove = false
              let isIntersectingFromAbove = false;
              if (entries[0].rootBounds) {
                isIntersectingFromAbove =
                  entries[0].boundingClientRect.y < entries[0].rootBounds.y;
              }
              observerRef.current && observerRef.current.unobserve(node);
              onVisibilityChange(
                node,
                entries[0].intersectionRatio,
                isIntersectingFromAbove
              );
            }
          },
          { ...defaultIntersectionObserverInit, root: currentScrollRef }
        );

        observerRef.current.observe(node);
      }
    },
    [onVisibilityChange, currentScrollRef]
  );
  return [observerCallback];
};
