import { TStore, TTracker } from "../types";

export enum Actions {
  CREATE_TRACKER = "CREATE_TRACKER",
  UPDATE_TRACKER = "UPDATE_TRACKER",
  DELETE_TRACKER = "DELETE_TRACKER",
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

export type TAction = TCreateTracker | TUpdateTracker | TDeleteTracker;

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
    default:
      return state;
  }
};
