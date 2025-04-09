import { useEffect, useRef, useCallback } from "react";

const useInfiniteScroll = (callback: () => void, enabled = true) => {
  const observerRef = useRef<HTMLDivElement | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  const setRef = useCallback(
    (node: Element | null) => {
      if (observer.current) observer.current.disconnect();

      if (enabled && node) {
        observer.current = new IntersectionObserver(([entry]) => {
          if (entry.isIntersecting) {
            callback();
          }
        });

        observer.current.observe(node);
      }

      observerRef.current = node as HTMLDivElement | null;
    },
    [callback, enabled]
  );

  useEffect(() => {
    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, []);

  return setRef;
};

export default useInfiniteScroll;
