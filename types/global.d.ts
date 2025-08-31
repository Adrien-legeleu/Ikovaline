// types/global.d.ts
interface IdleDeadline {
  didTimeout: boolean;
  timeRemaining: () => number;
}

interface Window {
  requestIdleCallback?: (
    callback: (deadline: IdleDeadline) => void,
    options?: { timeout: number }
  ) => number;
  cancelIdleCallback?: (handle: number) => void;
}
