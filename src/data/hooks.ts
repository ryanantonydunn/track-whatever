import React from "react";
import { TInput, TPage, TTracker } from "../types";
import { arrayObjSort } from "../utils/sort";
import { useStore } from "./provider";

/**
 * Get pages sorted by their order value
 */

export const usePages = (): TPage[] => {
  const { state } = useStore();
  const pages = React.useMemo(() => {
    return state.config.pageOrder
      .map((id) => state.pages.find((page) => page._id === id))
      .filter(Boolean) as TPage[]; // not sure why TS doesn't recognise this filter is removing undefineds
  }, [state.config.pageOrder, state.pages]);
  return pages;
};

/**
 * Function to get a particular page
 */

type TUseGetPage = (id?: string) => TPage | undefined;

type TPageDataRef = {
  [key: string]: TPage;
};

export const useGetPage = (): TUseGetPage => {
  const { state } = useStore();

  // store by ID
  const byID = React.useMemo<TPageDataRef>(() => {
    return Object.fromEntries(state.pages.map((t) => [t._id, t]));
  }, [state.pages]);

  const getPage = React.useCallback((id?: string) => byID[id || ""], [byID]);
  return getPage;
};

/**
 * Get a particular page
 */

export const usePage = (id?: string): TPage | undefined => {
  const getPage = useGetPage();
  return React.useMemo(() => getPage(id), [id, getPage]);
};

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
    const trackersByID = Object.fromEntries(
      state.trackers.map((t) => [t._id, t])
    );
    return trackersByID;
  }, [state.trackers]);

  const getTracker = React.useCallback((id?: string) => byID[id || ""], [byID]);
  return getTracker;
};

/**
 * Get a particular tracker
 */

export const useTracker = (id?: string): TTracker | undefined => {
  const getTracker = useGetTracker();
  return React.useMemo(() => {
    return getTracker(id);
  }, [id, getTracker]);
};

/**
 * Function to get a particular input information
 */

type TUseGetInput = (id?: string) => TInput | undefined;

export const useGetInput = (): TUseGetInput => {
  const { state } = useStore();
  const getInput = React.useCallback(
    (id?: string) => {
      return state.inputs.find((d) => d._id === id);
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
