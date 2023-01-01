import { v4 as uuidv4 } from "uuid";
import { TGroup, TInputType, TTracker } from "../types";

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

export const inputTypes: TInputType[] = [
  { id: "slider", title: "Slider" },
  { id: "number", title: "Number" },
  { id: "checklist", title: "Checklist" },
  { id: "checklistItem", title: "Checklist Item" },
  { id: "boolean", title: "Yes/No" },
  { id: "text", title: "Text" },
];

const removeInputTypes = ["checklistItem"];
export const filteredInputTypes = inputTypes.filter(
  (d) => !removeInputTypes.includes(d.id)
);
