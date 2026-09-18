import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/**
 * React 19 recommended pattern for hydration safety without setState in useEffect
 */
export function useMounted(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}
