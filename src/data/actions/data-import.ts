import { TStore } from "../../types";
import { db, dbDestroy, dbRecreate } from "../database";

export async function dataImport(file?: File) {
  if (!file) {
    alert("Invalid file");
    return;
  }
  const reader = new FileReader();
  reader.onload = async (e) => {
    if (typeof e.target?.result === "string") {
      try {
        const newData = JSON.parse(e.target.result) as Partial<TStore>;
        await dbDestroy();
        await dbRecreate();
        if (newData.config) await db.config.put(newData.config);
        if (newData.trackers) await db.trackers.bulkDocs(newData.trackers);
        if (newData.pages) await db.pages.bulkDocs(newData.pages);
        if (newData.inputs) await db.inputs.bulkDocs(newData.inputs);
        window.location.reload();
      } catch (e) {
        console.error(e);
      }
    }
  };
  reader.readAsText(file);
}
