import React from "react";

type ReturnType<ElementType> = [React.RefObject<ElementType>, boolean];
const useHover = <ElementType>(): ReturnType<ElementType> => {
  const [value, setValue] = React.useState(false);

  const ref = React.useRef<ElementType>(null);

  React.useEffect(() => {
    const handleMouseOver = (): void => setValue(true);
    const handleMouseOut = (): void => setValue(false);

    const node = ref.current;
    if (node instanceof Element) {
      node.addEventListener("mouseenter", handleMouseOver);
      node.addEventListener("mouseleave", handleMouseOut);

      return (): void => {
        node.removeEventListener("mouseenter", handleMouseOver);
        node.removeEventListener("mouseleave", handleMouseOut);
      };
    }
  }, []);

  return [ref, value];
};

export default useHover;
