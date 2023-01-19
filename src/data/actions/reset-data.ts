import { db } from "../database";

export async function resetData(): Promise<void> {
  try {
    await db.config.destroy();
    await db.trackers.destroy();
    await db.pages.destroy();
    await db.inputs.destroy();
    window.location.reload();
  } catch (err) {
    console.error(err);
  }
}
