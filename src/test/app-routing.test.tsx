import { QueryClient } from "@tanstack/react-query";
import { createMemoryHistory, createRouter, RouterProvider } from "@tanstack/react-router";
import { cleanup, render, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { routeTree } from "@/routeTree.gen";

async function renderAt(path: string) {
  const queryClient = new QueryClient();
  const router = createRouter({
    routeTree,
    context: { queryClient },
    history: createMemoryHistory({ initialEntries: [path] }),
  });
  // Resolve the initial match first so the shell renders the route, not a pending state.
  await router.load();
  return render(<RouterProvider router={router} />);
}

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

// The root shell renders <html>/<body>, which React hoists onto the document
// itself, so the RTL container stays empty. Assert on the document body instead.
function paintedText() {
  return document.body.textContent?.trim() ?? "";
}

// Assert only that the router mounts and paints, never page content:
// routes are rewritten as the app is built and this must keep passing.
describe("App routing", () => {
  it("renders the index route", async () => {
    await renderAt("/");

    await waitFor(() => expect(paintedText()).not.toBe(""));
    // The root error boundary must not be what painted.
    expect(paintedText()).not.toContain("This page didn't load");
  });

  it("renders the not-found route", async () => {
    vi.spyOn(console, "warn").mockImplementation(() => undefined);

    await renderAt("/this-route-does-not-exist");

    await waitFor(() => expect(paintedText()).not.toBe(""));
  });
});
