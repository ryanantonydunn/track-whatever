import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import { GroupAdd } from "./components/views/GroupAdd";
import { Home } from "./components/views/Home";
import { DataCompareList } from "./components/views/DataCompareList";
import { GroupView } from "./components/views/GroupView";
import { StoreProvider } from "./data/provider";
import { GroupEdit } from "./components/views/GroupEdit";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/add-group",
    element: <GroupAdd />,
  },
  {
    path: "/edit-group/:groupId",
    element: <GroupEdit />,
  },
  {
    path: "/group/:groupId",
    element: <GroupView />,
  },
  {
    path: "/compare-data",
    element: <DataCompareList />,
  },
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
