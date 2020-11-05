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
): RefCallback<RefElement> => {
  // | null is needed because we own the ref.
  // More info here: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/31065#issuecomment-446425911
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    return (): void => {
      observerRef.current && observerRef.current.disconnect();
    };
  }, []);

  const observerCallback: RefCallback<RefElement> = useCallback(
    (node) => {
      // Disconnecting from the previous observer should happen outside of node check
      // If it were inside it would work incorrectly Stepper story when:
      //    1. Selected is initially 0. useIsVisible observes Item 0 div
      //    2. User clicks minus-button so that Selected becomes -1
      //    3. Since there is no such item node === null but we are still observing the last item
      observerRef.current && observerRef.current.disconnect();
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
              onVisibilityChange(
                node,
                entries[0].intersectionRatio,
                isIntersectingFromAbove
              );
            }
          },
          { ...defaultIntersectionObserverInit, root: scrollRef.current }
        );

        observerRef.current.observe(node);
      }
    },
    [onVisibilityChange, scrollRef]
  );
  return observerCallback;
};
