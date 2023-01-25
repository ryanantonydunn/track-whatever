import { TConfig, TPage, TTracker } from "../../types";
import { db } from "../database";

// set up the config
export async function configGet(): Promise<TConfig | undefined> {
  try {
    const config = await db.config.get<TConfig>("config");
    return config;
  } catch (err) {
    // init config if not existing
    await db.config.put({
      _id: "config",
      hasInitialised: false,
      pageOrder: [],
    });
    const config = await db.config.get<TConfig>("config");
    return config;
  }
}

// set up the trackers and pages
export async function setExampleDocs(config: TConfig): Promise<void> {
  try {
    await db.trackers.put<Partial<TTracker>>({
      _id: "1",
      title: "Mood",
      inputType: "slider",
      slider: { min: 0, max: 10, increment: 1 },
    });
    await db.trackers.put<Partial<TTracker>>({
      _id: "2",
      _rev: "",
      title: "Sugar",
      inputType: "checkbox",
    });
    await db.pages.put<Partial<TPage>>({
      _id: "0",
      _rev: "",
      title: "My Trackers",
      items: [
        { _id: "1", type: "tracker" },
        { _id: "2", type: "tracker" },
      ],
    });
    await db.config.put<TConfig>({
      ...config,
      hasInitialised: true,
      pageOrder: ["0"],
    });
  } catch (err) {
    console.error(err);
  }
}
