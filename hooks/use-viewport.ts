import { MutableRefObject, useEffect, useRef, useState } from 'react';

export const useViewport = (
  options?: IntersectionObserverInit
): [MutableRefObject<HTMLDivElement>, boolean] => {
  const ref = useRef<HTMLDivElement>();
  const [state, setState] = useState(false);
  useEffect(() => {
    if (ref.current) {
      const { current } = ref;
      const observer = new IntersectionObserver(([entry]) => {
        setState(!!entry.intersectionRatio);
      }, options);
      observer.observe(current);
      return () => observer.unobserve(current);
    }
  }, [ref.current]);
  // @ts-ignore
  return [ref, state];
};
