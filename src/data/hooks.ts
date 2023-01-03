import React from "react";
import { TTracker } from "../types";
import { useStore } from "./provider";
import { Actions } from "./reducer";
/**
 * Get all trackers
 */

export const useTrackers = (): TTracker[] => {
  const { state } = useStore();
  return state.trackers;
};

/**
 * Function to get a particular trackers information
 */

type TUseGetTracker = (id?: string) => TTracker | undefined;

export const useGetTracker = (): TUseGetTracker => {
  const { state } = useStore();
  const getTracker = React.useCallback(
    (id?: string) => {
      return state.trackers.find((d) => d.id === id);
    },
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
