import { TConfig } from "../../types";
import { db } from "../database";

// set up the config
export async function configGet(): Promise<TConfig | undefined> {
  try {
    const config = await db.config.get<TConfig>("config");
    return config;
  } catch (err) {
    // no config yet set up
    return undefined;
  }
}
