import { throttle } from './throttle';

class NodeResizeManager {
  private static instance: NodeResizeManager;
  private observer: ResizeObserver | null = null;
  private observedElements = new WeakMap<Element, () => void>();
  private updateQueued = false;

  private constructor() {
    this.observer = new ResizeObserver(
      throttle((entries: ResizeObserverEntry[]) => {
        if (this.updateQueued) return;
        
        const validEntries = entries.filter(entry => 
          entry.contentRect.width > 0 && entry.contentRect.height > 0
        );
        
        if (validEntries.length === 0) return;

        this.updateQueued = true;
        requestAnimationFrame(() => {
          window.dispatchEvent(new CustomEvent('noderesized'));
          this.updateQueued = false;
        });
      }, 100)
    );
  }

  static getInstance(): NodeResizeManager {
    if (!NodeResizeManager.instance) {
      NodeResizeManager.instance = new NodeResizeManager();
    }
    return NodeResizeManager.instance;
  }

  observe(element: Element | null): () => void {
    if (!element || this.observedElements.has(element)) {
      return () => {};
    }

    try {
      this.observer?.observe(element, {
        box: 'border-box'
      });

      const cleanup = () => this.unobserve(element);
      this.observedElements.set(element, cleanup);
      return cleanup;
    } catch (error) {
      console.warn('Failed to observe element:', error);
      return () => {};
    }
  }

  unobserve(element: Element) {
    if (this.observedElements.has(element)) {
      this.observer?.unobserve(element);
      this.observedElements.delete(element);
    }
  }
}

// Export the observeElement function
export const observeElement = (element: Element) => {
  return NodeResizeManager.getInstance().observe(element);
};

export default NodeResizeManager;