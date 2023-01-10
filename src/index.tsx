import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { PageView } from "./components/views/PageView";
import { StoreProvider } from "./data/provider";
import "./index.css";
import { TrackerList } from "./components/views/TrackerList";
import { TrackerView } from "./components/views/TrackerView";
import { ImportExport } from "./components/views/ImportExport";
import { DataError } from "./components/views/DataError";
import { CompareView } from "./components/views/CompareView";
import { PageList } from "./components/views/PageList";
import { PageListEdit } from "./components/views/PageListEdit";
import { PageEdit } from "./components/views/PageEdit";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PageList />,
  },
  {
    path: "/edit-pages",
    element: <PageListEdit />,
  },
  {
    path: "/edit-page/:pageId",
    element: <PageEdit />,
  },
  {
    path: "/page/:pageId",
    element: <PageView />,
  },
  {
    path: "/trackers",
    element: <TrackerList />,
  },
  {
    path: "/tracker/:trackerId",
    element: <TrackerView />,
  },
  {
    path: "/import-export",
    element: <ImportExport />,
  },
  {
    path: "/compare",
    element: <CompareView />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <StoreProvider>
      <DataError>
        <RouterProvider router={router} />
      </DataError>
    </StoreProvider>
  </React.StrictMode>
);
