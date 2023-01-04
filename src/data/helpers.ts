import { v4 as uuidv4 } from "uuid";
import { TInput, TInputType, TTracker } from "../types";

export const createBlankTracker = (): TTracker => {
  return {
    id: uuidv4(),
    title: "New Tracker",
    inputType: "checkbox",
  };
};

export const createBlankInput = (): TInput => {
  return {
    id: uuidv4(),
    date: new Date().toISOString(),
    trackerId: "",
    value: "",
  };
};

export const inputTypes: TInputType[] = [
  { id: "checkbox", title: "Checkbox" },
  { id: "slider", title: "Slider" },
  { id: "number", title: "Number" },
  { id: "text", title: "Text" },
];
