import { useEffect, RefObject } from 'react';

type EventType = 'mousedown' | 'click' | 'mouseup' | 'touchstart' | 'touchend';

export function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  refs: (RefObject<T | null>)[],
  handler: (event: MouseEvent | TouchEvent) => void,
  eventType: EventType = 'mousedown',
): void {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const isInside = refs.some((ref) => ref?.current && ref.current.contains(event.target as Node));

      if (!isInside) {
        handler(event);
      }
    };

    document.addEventListener(eventType, listener);

    return () => {
      document.removeEventListener(eventType, listener);
    };
  }, [refs, eventType, handler]);
}
