export type TInputKey =
  | "slider"
  | "number"
  | "checklist"
  | "checklistItem"
  | "boolean"
  | "text";

export type TTracker = {
  id: string;
  title: string;
  inputType: TInputKey;
  min?: number;
  max?: number;
  increment?: number;
  items?: string[];
};

export type TGroup = {
  id: string;
  title: string;
  trackers: string[];
};

export type TInput = {
  trackerId: string;
  date: string;
  value: number | string | boolean;
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
};
