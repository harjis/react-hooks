import React from "react";

// I don't understand why I can't explicitly type the return value like in other useHover
type ReturnType<ElementType> = [React.RefObject<ElementType>, boolean];
const useHover2 = <ElementType>(
  externalRef?: React.RefObject<ElementType>
): ReturnType<ElementType> => {
  const [value, setValue] = React.useState(false);

  let internalRef = React.useRef<ElementType>(null);
  const ref = externalRef === undefined ? internalRef : externalRef;

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

export default useHover2;
