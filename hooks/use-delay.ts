import { debounce, throttle } from 'lodash';
import { useCallback } from 'react';

function useThrottle<T extends (...args: any[]) => void>(
  callback: T,
  delay: number,
  dependencies: readonly any[] = []
) {
  return useCallback(throttle(callback, delay), dependencies);
}

function useDebounce<T extends (...args: any[]) => void>(
  callback: T,
  delay: number,
  dependencies: readonly any[] = []
) {
  return useCallback(debounce(callback, delay), dependencies);
}

export { useDebounce, useThrottle };
