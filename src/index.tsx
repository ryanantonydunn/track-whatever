import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { CompareView } from "./components/views/CompareView";
import { DataError } from "./components/views/DataError";
import { DataView } from "./components/views/DataView";
import { ImportExport } from "./components/views/ImportExport";
import { PageEdit } from "./components/views/PageEdit";
import { PageListEdit } from "./components/views/PageListEdit";
import { TrackerList } from "./components/views/TrackerList";
import { TrackerView } from "./components/views/TrackerView";
import { StoreProvider } from "./data/provider";
import "./index.css";
import { PageView } from "./components/views/PageView";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DataView />,
  },
  {
    path: "/entry/:pageId",
    element: <PageView />,
  },
  {
    path: "/pages",
    element: <PageListEdit />,
  },
  {
    path: "/page/:pageId",
    element: <PageEdit />,
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
