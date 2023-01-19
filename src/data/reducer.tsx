import { TInput, TPage, TStore, TTracker } from "../types";
import { reorderArray } from "../utils/reorder-array";

export enum Actions {
  CREATE_TRACKER = "CREATE_TRACKER",
  UPDATE_TRACKER = "UPDATE_TRACKER",
  DELETE_TRACKER = "DELETE_TRACKER",
  CREATE_PAGE = "CREATE_PAGE",
  UPDATE_PAGE = "UPDATE_PAGE",
  DELETE_PAGE = "DELETE_PAGE",
  REORDER_PAGES = "REORDER_PAGES",
  CREATE_INPUT = "CREATE_INPUT",
  UPDATE_INPUT = "UPDATE_INPUT",
  DELETE_INPUT = "DELETE_INPUT",
  CREATE_VIEW = "CREATE_VIEW",
  UPDATE_VIEW = "UPDATE_VIEW",
  DELETE_VIEW = "DELETE_VIEW",
  RESET_ALL_DATA = "RESET_ALL_DATA",
}

type TCreatePage = {
  type: Actions.CREATE_PAGE;
  payload: TPage;
};

type TUpdatePage = {
  type: Actions.UPDATE_PAGE;
  payload: TPage;
};

type TDeletePage = {
  type: Actions.DELETE_PAGE;
  payload: string;
};

type TReorderPages = {
  type: Actions.REORDER_PAGES;
  payload: { oldIndex: number; newIndex: number };
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

type TResetAllData = {
  type: Actions.RESET_ALL_DATA;
  payload: TStore;
};

export type TAction =
  | TCreatePage
  | TUpdatePage
  | TDeletePage
  | TReorderPages
  | TCreateTracker
  | TUpdateTracker
  | TDeleteTracker
  | TCreateInput
  | TUpdateInput
  | TDeleteInput
  | TResetAllData;

export const reducer = (state: TStore, action: TAction): TStore => {
  switch (action.type) {
    case Actions.CREATE_PAGE:
      return {
        ...state,
        pages: [...state.pages, action.payload],
      };
    case Actions.UPDATE_PAGE:
      return {
        ...state,
        pages: state.pages.map((page) =>
          page._id === action.payload._id ? action.payload : page
        ),
      };
    case Actions.DELETE_PAGE:
      const pages = [...state.pages];
      const pageIndex = pages.findIndex((t) => t._id === action.payload);
      if (pageIndex !== -1) {
        pages.splice(pageIndex, 1);
      }
      return { ...state, pages };
    case Actions.REORDER_PAGES:
      return {
        ...state,
        pages: reorderArray(
          state.pages,
          action.payload.oldIndex,
          action.payload.newIndex
        ),
      };
    case Actions.CREATE_TRACKER:
      return {
        ...state,
        trackers: [...state.trackers, action.payload],
      };
    case Actions.UPDATE_TRACKER:
      return {
        ...state,
        trackers: state.trackers.map((tracker) =>
          tracker._id === action.payload._id ? action.payload : tracker
        ),
      };
    case Actions.DELETE_TRACKER:
      // remove actual tracker
      const trackers = [...state.trackers];
      const trackerIndex = trackers.findIndex((t) => t._id === action.payload);
      if (trackerIndex !== -1) {
        trackers.splice(trackerIndex, 1);
      }

      return {
        ...state,
        trackers,
        // remove all associated page items
        pages: state.pages.map((page) => ({
          ...page,
          items: page.items.filter(
            (page) => !(page.type === "tracker" && page._id === action.payload)
          ),
        })),
        // remove all associated items
        inputs: state.inputs.filter(
          (input) => input.trackerId !== action.payload
        ),
      };
    case Actions.CREATE_INPUT:
      return {
        ...state,
        inputs: [...state.inputs, action.payload],
      };
    case Actions.UPDATE_INPUT:
      return {
        ...state,
        inputs: state.inputs.map((input) =>
          input._id === action.payload._id ? action.payload : input
        ),
      };
    case Actions.DELETE_INPUT:
      const inputs = [...state.inputs];
      const inputIndex = inputs.findIndex((t) => t._id === action.payload);
      if (inputIndex !== -1) {
        inputs.splice(inputIndex, 1);
      }
      return { ...state, inputs };
    case Actions.RESET_ALL_DATA:
      return action.payload;
    default:
      return state;
  }
};
