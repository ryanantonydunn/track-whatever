export const inputKeys = [
  "slider",
  "number",
  "checklist",
  "checklistItem",
  "boolean",
  "text",
] as const;

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
  items?: string[];
};

export type TGroup = {
  id: string;
  title: string;
  trackers: string[];
};

export type TInputPrimitive = number | string | boolean;

export type TInput = {
  trackerId: string;
  date: string;
  value: TInputPrimitive;
};

export type TDataView = {
  id: string;
  title: string;
  trackerIds: string[];
};

export type TStore = {
  trackers: TTracker[];
  groups: TGroup[];
  inputs: TInput[];
  views: TDataView[];
  create: {
    tracker: TTracker;
    group: TGroup;
  };
};
