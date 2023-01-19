import { TTracker } from "../../types";
import { db } from "../database";

export async function trackersGet(): Promise<TTracker[] | undefined> {
  try {
    const response = await db.trackers.allDocs<TTracker>({
      include_docs: true,
    });
    const trackers = response.rows
      .map((d) => d.doc)
      .filter(Boolean) as TTracker[];
    return trackers;
  } catch (err) {
    console.error(err);
  }
}
