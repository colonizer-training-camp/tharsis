import { RouterProvider, createRouter } from "@tanstack/react-router";
import ReactDOM from "react-dom/client";

import { Global } from "@emotion/react";
import { routeTree } from "./routeTree.gen";
import gloablStyle from "./styles/reset";

const router = createRouter({ routeTree, scrollRestoration: true });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <>
      <Global styles={gloablStyle} />
      <RouterProvider router={router} />
    </>
  );
}
