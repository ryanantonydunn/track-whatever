import { TInput, TStore, TTracker } from "../types";

export enum Actions {
  CREATE_TRACKER = "CREATE_TRACKER",
  UPDATE_TRACKER = "UPDATE_TRACKER",
  DELETE_TRACKER = "DELETE_TRACKER",
  CREATE_INPUT = "CREATE_INPUT",
  UPDATE_INPUT = "UPDATE_INPUT",
  DELETE_INPUT = "DELETE_INPUT",
  CREATE_VIEW = "CREATE_VIEW",
  UPDATE_VIEW = "UPDATE_VIEW",
  DELETE_VIEW = "DELETE_VIEW",
}

type TCreateTracker = {
  type: Actions.CREATE_TRACKER;
  payload: TTracker;
};

type TUpdateTracker = {
  type: Actions.UPDATE_TRACKER;
  payload: TTracker;
};

type TDeleteTracker = {
  type: Actions.DELETE_TRACKER;
  payload: string;
};

type TCreateInput = {
  type: Actions.CREATE_INPUT;
  payload: TInput;
};

type TUpdateInput = {
  type: Actions.UPDATE_INPUT;
  payload: TInput;
};

type TDeleteInput = {
  type: Actions.DELETE_INPUT;
  payload: string;
};

export type TAction =
  | TCreateTracker
  | TUpdateTracker
  | TDeleteTracker
  | TCreateInput
  | TUpdateInput
  | TDeleteInput;

export const reducer = (state: TStore, action: TAction): TStore => {
  switch (action.type) {
    case Actions.CREATE_TRACKER:
      return {
        ...state,
        trackers: [...state.trackers, action.payload],
      };
    case Actions.UPDATE_TRACKER:
      return {
        ...state,
        trackers: state.trackers.map((tracker) =>
          tracker.id === action.payload.id ? action.payload : tracker
        ),
      };
    case Actions.DELETE_TRACKER:
      const trackers = [...state.trackers];
      const trackerIndex = trackers.findIndex((t) => t.id === action.payload);
      if (trackerIndex !== -1) {
        trackers.splice(trackerIndex, 1);
      }
      // TODO remove all associated data
      return { ...state, trackers };
    case Actions.CREATE_INPUT:
      return {
        ...state,
        inputs: [...state.inputs, action.payload],
      };
    case Actions.UPDATE_INPUT:
      return {
        ...state,
        inputs: state.inputs.map((input) =>
          input.id === action.payload.id ? action.payload : input
        ),
      };
    case Actions.DELETE_INPUT:
      const inputs = [...state.inputs];
      const inputIndex = inputs.findIndex((t) => t.id === action.payload);
      if (inputIndex !== -1) {
        inputs.splice(inputIndex, 1);
      }
      return { ...state, inputs };
    default:
      return state;
  }
};
