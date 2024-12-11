import { throttle } from './throttle';

const observedNodes = new WeakMap<HTMLElement, MutationObserver>();

const handleNodeChange = throttle(() => {
  requestAnimationFrame(() => {
    window.dispatchEvent(new Event('nodechange'));
  });
}, 100);

export const observeNode = (element: HTMLElement) => {
  if (!element || observedNodes.has(element)) {
    return () => {};
  }

  const observer = new MutationObserver(handleNodeChange);

  const config = {
    attributes: true,
    childList: true,
    subtree: true,
    characterData: true
  };

  observer.observe(element, config);
  observedNodes.set(element, observer);

  return () => {
    if (observedNodes.has(element)) {
      const obs = observedNodes.get(element);
      if (obs) {
        obs.disconnect();
        observedNodes.delete(element);
      }
    }
  };
};