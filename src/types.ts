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

export type TStore = {
  trackers: TTracker[];
  inputs: TInput[];
};
