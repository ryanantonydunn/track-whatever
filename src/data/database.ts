import pouchdb from "pouchdb";

export const db: { [key: string]: PouchDB.Database } = {};

export async function setupDB() {
  db.trackers = new pouchdb("trackers");
  db.pages = new pouchdb("pages");
  db.inputs = new pouchdb("inputs");
}
