import { useEffect, useRef } from "react";

export type Handler<E extends keyof WindowEventMap> = (
  e: WindowEventMap[E]
) => void;

// TODO make this work with refs and other elements too
export const useWindowEventListener = <EventName extends keyof WindowEventMap>(
  eventName: EventName,
  handler: Handler<EventName>
) => {
  const savedHandler = useRef<Handler<EventName>>();
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const eventListener = (event: WindowEventMap[EventName]) =>
      savedHandler.current && savedHandler.current(event);

    window.addEventListener(eventName, eventListener);

    return () => {
      window.removeEventListener(eventName, eventListener);
    };
  }, [eventName]);
};
