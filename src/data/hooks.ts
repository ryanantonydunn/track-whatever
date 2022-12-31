import React from "react";
import { TGroup, TTracker } from "../types";
import { useStore } from "./provider";
import { Actions } from "./reducer";

/**
 * Get all groups
 */

export const useGroups = (): TGroup[] => {
  const { state } = useStore();
  return state.groups;
};

/**
 * Getter and setter tuple for a particular group
 */

type TUseGroup = [TGroup | undefined, (group: TGroup) => void];

export const useGroup = (id?: string): TUseGroup => {
  const { dispatch, state } = useStore();
  const group = React.useMemo(
    () => state.groups.find((d) => d.id === id),
    [id, state.groups]
  );
  const setGroup = React.useCallback(
    (newGroup: TGroup) => {
      dispatch({ type: Actions.UPDATE_GROUP, payload: newGroup });
    },
    [dispatch]
  );
  return [group, setGroup];
};

/**
 * Get all trackers
 */

export const useTrackers = (includeChecklistItems?: boolean): TTracker[] => {
  const { state } = useStore();
  if (includeChecklistItems) {
    return state.trackers;
  }
  return state.trackers.filter((t) => t.inputType !== "checklistItem");
};

/**
 * Function to get a particular trackers information
 */

type TUseGetTracker = (id?: string) => TTracker | undefined;

export const useGetTracker = (): TUseGetTracker => {
  const { state } = useStore();
  const getTracker = React.useCallback(
    (id?: string) => state.trackers.find((t) => t.id === id),
    [state.trackers]
  );
  return getTracker;
};

/**
 * Getter and setter tuple for a particular tracker
 */

type TUseTracker = [TTracker | undefined, (tracker: TTracker) => void];

export const useTracker = (id?: string): TUseTracker => {
  const getTracker = useGetTracker();
  const tracker = React.useMemo(() => getTracker(id), [id, getTracker]);

  const { dispatch } = useStore();
  const setTracker = React.useCallback(
    (newTracker: TTracker) => {
      dispatch({ type: Actions.UPDATE_TRACKER, payload: newTracker });
    },
    [dispatch]
  );
  return [tracker, setTracker];
};
