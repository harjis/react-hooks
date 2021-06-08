import { useCallback, useEffect, useRef, useState } from "react";

type Return<RefElement> = [React.RefObject<RefElement>, boolean, () => void];

export const useHasScrolled = <RefElement extends HTMLElement>(): Return<
  RefElement
> => {
  const scrollRef = useRef<RefElement>(null);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const { current } = scrollRef;

    const handleScroll = () => {
      setHasScrolled(true);
    };

    current?.addEventListener("scroll", handleScroll);

    return () => {
      current?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const resetScroll = useCallback(() => {
    setHasScrolled(false);
  }, []);

  return [scrollRef, hasScrolled, resetScroll];
};
