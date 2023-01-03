import { v4 as uuidv4 } from "uuid";
import { TInputType, TTracker } from "../types";

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
  { id: "boolean", title: "Yes/No" },
  { id: "text", title: "Text" },
];
