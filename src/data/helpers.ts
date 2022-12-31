import { v4 as uuidv4 } from "uuid";
import { TGroup, TTracker } from "../types";

export const createBlankGroup = (): TGroup => {
  return {
    id: uuidv4(),
    title: "New Group",
    trackers: [],
  };
};

export const createBlankTracker = (): TTracker => {
  return {
    id: uuidv4(),
    title: "New Tracker",
    inputType: "boolean",
  };
};
