export const inputKeys = ["slider", "number", "checkbox", "text"] as const;

export type TInputKey = typeof inputKeys[number];

export type TInputType = {
  _id: string;
  title: string;
};

export type TSliderValues = {
  min: number;
  max: number;
  increment: number;
};

export type TTracker = {
  _id: string;
  _rev: string;
  title: string;
  inputType: TInputKey;
  slider?: TSliderValues;
};

export type TInputPrimitive = number | string | boolean;

export type TInput = {
  _id: string;
  _rev: string;
  date: string;
  trackerId: string;
  value: TInputPrimitive;
};

export const pageItemTypes = ["tracker"] as const;

export type TPageItemType = typeof pageItemTypes[number];

export type TPageItem = {
  type: TPageItemType;
  _id?: string;
};

export type TPage = {
  _id: string;
  _rev: string;
  title: string;
  items: TPageItem[];
};

export type TStore = {
  pages: TPage[];
  trackers: TTracker[];
  inputs: TInput[];
};

export const inputTypes: TInputType[] = [
  { _id: "checkbox", title: "Checkbox" },
  { _id: "slider", title: "Slider" },
  { _id: "number", title: "Number" },
  { _id: "text", title: "Text" },
];
