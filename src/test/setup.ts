import "@testing-library/jest-dom/vitest";

Object.defineProperty(window, "scrollTo", {
  writable: true,
  value: () => {},
});

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});

// jsdom never fetches stylesheets, so <link rel="stylesheet"> never fires "load".
// React 19 suspends rendering until head stylesheets load, which would leave the
// app stuck blank in tests. Simulate the load event for every stylesheet link.
new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    mutation.addedNodes.forEach((node) => {
      if (node instanceof HTMLLinkElement && node.rel === "stylesheet") {
        queueMicrotask(() => node.dispatchEvent(new Event("load")));
      }
    });
  }
}).observe(document, { childList: true, subtree: true });
