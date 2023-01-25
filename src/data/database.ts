import PouchDB from "pouchdb";
import PouchDBFind from "pouchdb-find";

PouchDB.plugin(PouchDBFind);

export const db = {
  config: new PouchDB("config"),
  trackers: new PouchDB("trackers"),
  pages: new PouchDB("pages"),
  inputs: new PouchDB("inputs"),
};

async function createIndex() {
  try {
    await db.inputs.createIndex({
      index: {
        fields: ["date", "trackerId"],
      },
    });
  } catch (err) {
    console.log(err);
  }
}
createIndex();
