import { v4 as uuidv4 } from "uuid";
import { TInput, TPage, TTracker } from "../types";

export const createBlankTracker = (): TTracker => {
  return {
    _id: uuidv4(),
    _rev: "",
    title: "",
    inputType: "checkbox",
  };
};

export const createBlankInput = (): TInput => {
  return {
    _id: uuidv4(),
    _rev: "",
    date: new Date().toISOString(),
    trackerId: "",
    value: "",
  };
};

export const createBlankPage = (): TPage => {
  return {
    _id: uuidv4(),
    _rev: "",
    title: "",
    items: [],
  };
};
