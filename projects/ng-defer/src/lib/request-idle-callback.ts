type RequestIdleCallbackHandle = any;
type RequestIdleCallbackOptions = {
  timeout: number;
};
type RequestIdleCallbackDeadline = {
  readonly didTimeout: boolean;
  timeRemaining: (() => number);
};

declare global {
  interface Window {
    requestIdleCallback: ((
      callback: ((deadline: RequestIdleCallbackDeadline) => void),
      opts?: RequestIdleCallbackOptions,
    ) => RequestIdleCallbackHandle);
    cancelIdleCallback: ((handle: RequestIdleCallbackHandle) => void);
  }
}

let requestIdleCallback = window.requestIdleCallback ? window.requestIdleCallback.bind(window) : function(handler) {
  let startTime = Date.now();
 
  return setTimeout(function() {
    handler({
      didTimeout: false,
      timeRemaining: function() {
        return Math.max(0, 50.0 - (Date.now() - startTime));
      }
    });
  }, 1);
}

let cancelIdleCallback = window.cancelIdleCallback ? window.cancelIdleCallback.bind(window) : function(id) {
  clearTimeout(id);
}

export { requestIdleCallback, cancelIdleCallback };

