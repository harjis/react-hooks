import { useEffect } from "react";

export type Handler<E extends keyof DocumentEventMap> = (
  e: DocumentEventMap[E]
) => void;

export const useDocumentEventListener = <
  EventName extends keyof DocumentEventMap
>(
  eventName: EventName,
  handler: Handler<EventName>
) => {
  useEffect(() => {
    document.addEventListener(eventName, handler);
    return () => {
      document.removeEventListener(eventName, handler);
    };
  }, [eventName, handler]);
};
