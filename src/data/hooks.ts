import React from "react";
import { TInput, TTracker } from "../types";
import { useStore } from "./provider";
import { arrayObjSort } from "../utils/sort";

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
 * Get a particular tracker
 */

export const useTracker = (id?: string): TTracker | undefined => {
  const getTracker = useGetTracker();
  return React.useMemo(() => getTracker(id), [id, getTracker]);
};

/**
 * Function to get a particular input information
 */

type TUseGetInput = (id?: string) => TInput | undefined;

export const useGetInput = (): TUseGetInput => {
  const { state } = useStore();
  const getInput = React.useCallback(
    (id?: string) => {
      return state.inputs.find((d) => d.id === id);
    },
    [state.inputs]
  );
  return getInput;
};

/**
 * Get a particular input
 */

export const useInput = (id?: string): TInput | undefined => {
  const getInput = useGetInput();
  return React.useMemo(() => getInput(id), [id, getInput]);
};

/**
 * Get inputs by tracker
 */

export const useInputsByTracker = (trackerId?: string): TInput[] => {
  const { state } = useStore();
  return arrayObjSort(
    state.inputs.filter((d) => d.trackerId === trackerId),
    "date"
  );
};
