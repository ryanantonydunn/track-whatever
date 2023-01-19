import { TTracker } from "../../types";
import { useStore } from "../provider";
import { db } from "../database";
import React from "react";

export async function trackerCreate(
  newTracker: TTracker
): Promise<TTracker | undefined> {
  try {
    const response = await db.trackers.put(newTracker);
    if (response.ok) {
      const refetch = await db.trackers.get<TTracker>(newTracker._id);
      return refetch;
    } else {
      console.error(response);
    }
  } catch (err) {
    console.error(err);
  }
}

export const useTrackerCreate = () => {
  const { state, dispatch } = useStore();
  return React.useCallback(
    async (tracker: TTracker) => {
      const newTracker = await trackerCreate(tracker);
      if (newTracker) {
        dispatch({
          trackers: [...state.trackers, newTracker],
        });
      }
    },
    [state.trackers, dispatch]
  );
};