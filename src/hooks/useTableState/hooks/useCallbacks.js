import { useDeepCompareEffect } from 'use-deep-compare';

const useCallbacks = (callbackNamespace, callback, callbackInContext) => {
  useDeepCompareEffect(() => {
    if (callback) {
      callbackInContext.current = {
        ...callbackInContext.current,
        [callbackNamespace]: callback,
      };
    }
  }, [callback, callbackInContext, callbackNamespace]);
};

export default useCallbacks;
