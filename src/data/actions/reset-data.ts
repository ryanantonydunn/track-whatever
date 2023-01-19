import { db, setupDB } from "../database";

export async function resetData(): Promise<void> {
  try {
    await db.trackers.destroy();
    await db.pages.destroy();
    await db.inputs.destroy();
    await setupDB();
    window.location.reload();
  } catch (err) {
    console.error(err);
  }
}
