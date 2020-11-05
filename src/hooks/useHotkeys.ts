import React from "react";

export type EventListener = {
  keys: string[];
  eventListener: (event: KeyboardEvent) => void;
};
type Handler = (event: KeyboardEvent) => void;
type Props = {
  autoFocus: boolean;
  eventListeners: EventListener[];
};
type ReturnType<RefElement> = React.RefCallback<RefElement>;
export const useHotkeys = <RefElement extends HTMLElement>(
  props: Props
): ReturnType<RefElement> => {
  const { autoFocus, eventListeners } = props;
  const refCallback: React.RefCallback<RefElement> = React.useCallback(
    (element) => {
      const handlers: Handler[] = [];
      eventListeners.forEach(({ keys, eventListener }) => {
        const eventHandler = (event: KeyboardEvent) => {
          if (keys.includes(event.key)) {
            eventListener(event);
          }
        };
        handlers.push(eventHandler);
        element?.addEventListener("keydown", eventHandler);
      });

      if (autoFocus) {
        element?.focus();
      }

      return () => {
        handlers.forEach((handler) => {
          element?.removeEventListener("keydown", handler);
        });
      };
    },
    [autoFocus, eventListeners]
  );
  return refCallback;
};
