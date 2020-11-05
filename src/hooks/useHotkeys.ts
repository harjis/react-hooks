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
type ReturnType<RefElement> = React.RefObject<RefElement>;
export const useHotkeys = <RefElement extends HTMLElement>(
  props: Props
): ReturnType<RefElement> => {
  const ref = React.useRef<RefElement>(null);

  const { autoFocus, eventListeners } = props;
  React.useEffect(() => {
    const handlers: Handler[] = [];
    const element = ref.current;
    if (element instanceof Element) {
      eventListeners.forEach(({ keys, eventListener }) => {
        const eventHandler = (event: KeyboardEvent) => {
          if (keys.includes(event.key)) {
            eventListener(event);
          }
        };
        handlers.push(eventHandler);
        element.addEventListener("keydown", eventHandler);
      });
    }

    if (autoFocus && element instanceof HTMLElement) {
      element.focus();
    }

    return () => {
      if (element instanceof Element) {
        handlers.forEach((handler) => {
          element.addEventListener("keydown", handler);
        });
      }
    };
  }, [autoFocus, eventListeners]);
  return ref;
};
