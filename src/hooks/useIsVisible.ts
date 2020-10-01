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
): [RefCallback<RefElement>, number] => {
  const [isVisible, setIsVisible] = useState(0);
  const ref = useRef<RefElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    return (): void => {
      observerRef.current && observerRef.current.disconnect();
    };
  }, []);

  const observerCallback: RefCallback<RefElement> = useCallback(
    (node) => {
      if (node) {
        console.log(node);
        observerRef.current = new IntersectionObserver(
          (entries) => {
            if (entries.length) {
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
  return [observerCallback, isVisible];
};
