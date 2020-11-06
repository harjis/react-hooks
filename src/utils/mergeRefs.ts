import React from "react";

export function mergeRefs<ElementType>(
  refs: React.MutableRefObject<ElementType>[]
): React.RefCallback<ElementType> {
  return (instance: ElementType) => {
    refs.forEach((ref) => {
      ref.current = instance;
    });
  };
}
