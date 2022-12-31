import { TDataView, TGroup, TStore, TTracker } from "../types";

export enum Actions {
  CREATE_GROUP = "CREATE_GROUP",
  UPDATE_GROUP = "UPDATE_GROUP",
  DELETE_GROUP = "DELETE_GROUP",
  UPDATE_CREATE_GROUP = "UPDATE_CREATE_GROUP",
  CREATE_TRACKER = "CREATE_TRACKER",
  UPDATE_TRACKER = "UPDATE_TRACKER",
  DELETE_TRACKER = "DELETE_TRACKER",
  UPDATE_CREATE_TRACKER = "UPDATE_CREATE_TRACKER",
  CREATE_VIEW = "CREATE_VIEW",
  UPDATE_VIEW = "UPDATE_VIEW",
  DELETE_VIEW = "DELETE_VIEW",
}

type TCreateGroup = {
  type: Actions.CREATE_GROUP;
  payload: TGroup;
};

type TUpdateGroup = {
  type: Actions.UPDATE_GROUP;
  payload: TGroup;
};

type TDeleteGroup = {
  type: Actions.DELETE_GROUP;
  payload: string;
};

type TUpdateCreateGroup = {
  type: Actions.UPDATE_CREATE_GROUP;
  payload: TGroup;
};

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

type TUpdateCreateTracker = {
  type: Actions.UPDATE_CREATE_TRACKER;
  payload: TTracker;
};

type TCreateView = {
  type: Actions.CREATE_VIEW;
  payload: TDataView;
};

type TUpdateView = {
  type: Actions.UPDATE_VIEW;
  payload: TDataView;
};

type TDeleteView = {
  type: Actions.DELETE_VIEW;
  payload: string;
};

export type TAction =
  | TCreateGroup
  | TUpdateGroup
  | TDeleteGroup
  | TUpdateCreateGroup
  | TCreateTracker
  | TUpdateTracker
  | TDeleteTracker
  | TUpdateCreateTracker
  | TCreateView
  | TUpdateView
  | TDeleteView;

export const reducer = (state: TStore, action: TAction): TStore => {
  switch (action.type) {
    case Actions.CREATE_GROUP:
      return {
        ...state,
        groups: [...state.groups, action.payload],
      };
    case Actions.UPDATE_GROUP:
      return {
        ...state,
        groups: state.groups.map((group) =>
          group.id === action.payload.id ? action.payload : group
        ),
      };
    case Actions.UPDATE_CREATE_GROUP:
      return {
        ...state,
        create: {
          ...state.create,
          group: action.payload,
        },
      };
    case Actions.DELETE_GROUP:
      const groups = [...state.groups];
      const groupIndex = groups.findIndex((g) => g.id === action.payload);
      if (groupIndex !== -1) {
        groups.splice(groupIndex, 1);
      }
      return { ...state, groups };
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
