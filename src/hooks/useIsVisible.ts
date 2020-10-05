import {
  MutableRefObject,
  RefCallback,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

const defaultIntersectionObserverInit: IntersectionObserverInit = {
  root: null,
  rootMargin: "0px",
  threshold: Array.from({ length: 100 }, (v: undefined, i: number) => i * 0.01),
};

export const useIsVisible = <RefElement extends Element>(
  scrollRef: MutableRefObject<RefElement | null>
): [RefCallback<RefElement>, number, boolean] => {
  const [isVisible, setIsVisible] = useState(0);
  const [isAbove, setIsAbove] = useState(false);
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
              let isAbove = false;
              if (entries[0].rootBounds) {
                isAbove =
                  entries[0].boundingClientRect.y < entries[0].rootBounds.y;
              }
              console.log(isAbove);
              setIsAbove(isAbove);
              setIsVisible(entries[0].intersectionRatio);
            }
          },
          { ...defaultIntersectionObserverInit, root: scrollRef.current }
        );

        observerRef.current.observe(node);
      }
    },
    [scrollRef]
  );
  return [observerCallback, isVisible, isAbove];
};
