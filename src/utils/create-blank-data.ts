import { v4 as uuidv4 } from "uuid";
import { TInput, TPage, TTracker } from "../types";

export const createBlankTracker = (): TTracker => {
  return {
    id: uuidv4(),
    title: "",
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

export const createBlankPage = (): TPage => {
  return {
    id: uuidv4(),
    title: "",
    items: [],
  };
};
