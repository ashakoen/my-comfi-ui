export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle = false;
  let lastArgs: Parameters<T> | null = null;

  return (...args: Parameters<T>) => {
    if (inThrottle) {
      lastArgs = args;
      return;
    }

    func(...args);
    inThrottle = true;

    setTimeout(() => {
      inThrottle = false;
      if (lastArgs) {
        func(...lastArgs);
        lastArgs = null;
      }
    }, limit);
  };
};