import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { PageView } from "./components/views/PageView";
import { StoreProvider } from "./data/provider";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PageView />,
  },
  // {
  //   path: "/edit-groups",
  //   element: <GroupEditList />,
  // },
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
      <RouterProvider router={router} />
    </StoreProvider>
  </React.StrictMode>
);
