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
  // try {
  //   const result = await db.inputs.find({
  //     selector: {
  //       date: { $gte: null },
  //       trackerId: "1",
  //     },
  //     sort: [{ date: "desc" }],
  //     limit: 3,
  //     skip: 3,
  //   });
  //   console.log(result);
  // } catch (err) {
  //   console.log(err);
  // }
  // try {
  //   const result = await db.inputs.find({
  //     selector: {
  //       date: {
  //         $gte: "2023-01-10T00:00:00.000Z",
  //         $lt: "2023-01-19T00:00:00.000Z",
  //       },
  //       $or: [{ trackerId: "1" }, { trackerId: "3" }],
  //     },
  //     sort: [{ date: "desc" }],
  //     limit: 20,
  //     skip: 0,
  //   });
  //   console.log(result);
  // } catch (err) {
  //   console.log(err);
  // }
  // try {
  //   const result = await db.inputs.find({
  //     selector: {
  //       date: {
  //         $gte: "2023-01-10T00:00:00.000Z",
  //         $lt: "2023-01-19T00:00:00.000Z",
  //       },
  //       $or: [],
  //     },
  //     sort: [{ date: "desc" }],
  //     limit: 20,
  //     skip: 0,
  //   });
  //   console.log(result);
  // } catch (err) {
  //   console.log(err);
  // }
}
createIndex();
