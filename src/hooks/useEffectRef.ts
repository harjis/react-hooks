import React from "react";

type Cleanup = () => void;
// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop: Cleanup = () => {};

type EffectRef<RefElement extends HTMLElement> = (
  element: RefElement | null
) => void;
export type RefCallbackWithCleanup<RefElement extends HTMLElement> = (
  element: RefElement
) => () => void;

/*
 * The idea of this hook is to generalize cleanup for RefCallback.
 * By default React.RefCallback doesn't support cleanup.
 * */
export function useEffectRef<RefElement extends HTMLElement>(
  callback: RefCallbackWithCleanup<RefElement>
): EffectRef<RefElement> {
  const disposeRef = React.useRef<Cleanup>(noop);
  return React.useCallback(
    (element: RefElement | null) => {
      disposeRef.current();
      // To ensure every dispose function is called only once.
      disposeRef.current = noop;

      if (element) {
        disposeRef.current = callback(element);
      }
    },
    [callback]
  );
}
