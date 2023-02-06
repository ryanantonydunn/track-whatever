import PouchDB from "pouchdb";
import PouchDBFind from "pouchdb-find";

PouchDB.plugin(PouchDBFind);

// check for or create databases and indexes
export const db = {
  config: new PouchDB("config"),
  trackers: new PouchDB("trackers"),
  pages: new PouchDB("pages"),
  inputs: new PouchDB("inputs"),
};

async function setupIndex() {
  try {
    await db.inputs.createIndex({
      index: {
        fields: ["date", "trackerId"],
      },
    });

    // test query
    // const test = await db.inputs.find({
    //   selector: {},
    //   sort: [{ date: "desc" }],
    //   limit: 50,
    // });
  } catch (err) {
    console.error(err);
  }
}
setupIndex();

// destroy database
export async function dbDestroy() {
  await db.config.destroy();
  await db.trackers.destroy();
  await db.pages.destroy();
  await db.inputs.destroy();
}

// recreate databases
export async function dbRecreate() {
  db.config = new PouchDB("config");
  db.trackers = new PouchDB("trackers");
  db.pages = new PouchDB("pages");
  db.inputs = new PouchDB("inputs");
  await setupIndex();
}

// run initial setup if no database exists
export async function dbBase() {
  await db.config.put({
    _id: "config",
    pageOrder: ["0"],
  });
  await db.trackers.put({
    _id: "1",
    title: "Mood",
    inputType: "slider",
    slider: { min: 0, max: 10, increment: 1 },
  });
  await db.trackers.put({
    _id: "2",
    _rev: "",
    title: "Sugar",
    inputType: "checkbox",
  });
  await db.pages.put({
    _id: "0",
    _rev: "",
    title: "My Trackers",
    items: [
      { _id: "1", type: "tracker" },
      { _id: "2", type: "tracker" },
    ],
  });
}
