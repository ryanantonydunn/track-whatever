import React from "react";
import { TInput, TTracker } from "../types";
import { useStore } from "./provider";
import { arrayObjSort } from "../utils/sort";

/**
 * Function to get a particular tracker
 */

type TUseGetTracker = (id?: string) => TTracker | undefined;

type TTrackerDataRef = {
  [key: string]: TTracker;
};

export const useGetTracker = (): TUseGetTracker => {
  const { state } = useStore();

  // store by ID
  const byID = React.useMemo<TTrackerDataRef>(() => {
    return Object.fromEntries(state.trackers.map((t) => [t.id, t]));
  }, [state.trackers]);

  const getTracker = React.useCallback(
    (id?: string) => byID[id || ''],
    [byID]
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
 * Function to get inputs by tracker
 */

type TUseGetInputsByTracker = (id?: string) => TInput[];

export const useGetInputsByTracker = (): TUseGetInputsByTracker => {
  const { state } = useStore();
  const getInputByTracker = React.useCallback(
    (id?: string) => {
      return arrayObjSort(
        state.inputs.filter((d) => d.trackerId === id),
        "date"
      );
    },
    [state.inputs]
  );
  return getInputByTracker;
};

/**
 * Get inputs by tracker
 */

export const useInputsByTracker = (id?: string): TInput[] => {
  const getInputByTracker = useGetInputsByTracker();
  return React.useMemo(() => getInputByTracker(id), [id, getInputByTracker]);
};
