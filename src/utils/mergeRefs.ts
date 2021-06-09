import React from "react";

export function mergeRefs<ElementType>(
  refs: React.Ref<ElementType>[]
): React.RefCallback<ElementType> {
  return (instance: ElementType) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(instance);
      } else if (ref && typeof ref === "object") {
        (ref as React.MutableRefObject<ElementType>).current = instance;
      }
    });
  };
}
