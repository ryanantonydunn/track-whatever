import { dbDestroy } from "../database";

export async function dataReset(): Promise<void> {
  try {
    await dbDestroy();
    window.location.reload();
  } catch (err) {
    console.error(err);
  }
}
