import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { CompareView } from "./components/views/CompareView";
import { DataError } from "./components/views/DataError";
import { ImportExport } from "./components/views/ImportExport";
import { PageEdit } from "./components/views/PageEdit";
import { PageList } from "./components/views/PageList";
import { PageListEdit } from "./components/views/PageListEdit";
import { PageView } from "./components/views/PageView";
import { TrackerList } from "./components/views/TrackerList";
import { TrackerView } from "./components/views/TrackerView";
import { StoreProvider } from "./data/provider";
import "./index.css";

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
  <LocalizationProvider dateAdapter={AdapterDateFns}>
    <StoreProvider>
      <DataError>
        <RouterProvider router={router} />
      </DataError>
    </StoreProvider>
  </LocalizationProvider>
);
