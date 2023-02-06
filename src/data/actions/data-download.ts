import { downloadTextFile } from "../../utils/download-file";
import { configGet } from "./config-get";
import { inputsGetAbsolutelyAllOfThem } from "./inputs-get-all";
import { pagesGet } from "./pages-get";
import { trackersGet } from "./trackers-get";

export async function dataDownload(): Promise<void> {
  try {
    const config = await configGet();
    const pages = await pagesGet();
    const trackers = await trackersGet();
    const inputs = await inputsGetAbsolutelyAllOfThem();
    const fileName = `track-${new Date().toISOString()}.json`;

    if (!config || !pages || !trackers || !inputs) {
      console.error("failed to download");
      return;
    }

    // strip revision data
    config._rev = "";
    pages.forEach((d) => {
      d._rev = "";
    });
    trackers.forEach((d) => {
      d._rev = "";
    });
    inputs.forEach((d) => {
      d._rev = "";
    });

    const text = JSON.stringify({ config, pages, trackers, inputs });
    downloadTextFile(fileName, text);
  } catch (e) {
    console.error(e);
  }
}
