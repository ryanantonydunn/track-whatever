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

const router = createBrowserRouter([
  {
    path: "/",
    element: <PageView />,
  },
  {
    path: "/import-export",
    element: <ImportExport />,
  },
  {
    path: "/trackers",
    element: <TrackerList />,
  },
  {
    path: "/tracker/:trackerId",
    element: <TrackerView />,
  },
  // {
  //   path: "/add-group",
  //   element: <GroupAdd />,
  // },
  // {
  //   path: "/edit-group/:groupId",
  //   element: <GroupEdit />,
  // },
  // {
  //   path: "/group/:groupId",
  //   element: <GroupView />,
  // },
  // {
  //   path: "/add-tracker/:groupId",
  //   element: <TrackerAdd />,
  // },
  // {
  //   path: "/edit-tracker/:trackerId",
  //   element: <TrackerEdit />,
  // },
  // {
  //   path: "/compare-data",
  //   element: <DataCompareList />,
  // },
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
