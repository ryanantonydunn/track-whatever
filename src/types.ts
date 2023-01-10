export const inputKeys = ["slider", "number", "checkbox", "text"] as const;

export type TInputKey = typeof inputKeys[number];

export type TInputType = {
  id: string;
  title: string;
};

export type TSliderValues = {
  min: number;
  max: number;
  increment: number;
};

export type TTracker = {
  id: string;
  title: string;
  inputType: TInputKey;
  slider?: TSliderValues;
};

export type TInputPrimitive = number | string | boolean;

export type TInput = {
  id: string;
  date: string;
  trackerId: string;
  value: TInputPrimitive;
};

export const pageItemTypes = ["tracker"] as const;

export type TPageItemType = typeof pageItemTypes[number];

export type TPageItem = {
  type: TPageItemType;
  id?: string;
};

export type TPage = {
  id: string;
  title: string;
  items: TPageItem[];
};

export type TStore = {
  pages: TPage[];
  trackers: TTracker[];
  inputs: TInput[];
};

export const inputTypes: TInputType[] = [
  { id: "checkbox", title: "Checkbox" },
  { id: "slider", title: "Slider" },
  { id: "number", title: "Number" },
  { id: "text", title: "Text" },
];
