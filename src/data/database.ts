import pouchdb from "pouchdb";

export const db = {
  config: new pouchdb("config"),
  trackers: new pouchdb("trackers"),
  pages: new pouchdb("pages"),
  inputs: new pouchdb("inputs"),
};
