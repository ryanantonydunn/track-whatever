import { TTracker } from "../../types";
import { useStore } from "../provider";
import { db } from "../database";
import React from "react";
import { Actions } from "../reducer";

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
  const { dispatch } = useStore();
  return React.useCallback(
    async (tracker: TTracker) => {
      const newTracker = await trackerCreate(tracker);
      if (newTracker) {
        dispatch({ type: Actions.CREATE_TRACKER, payload: newTracker });
      }
    },
    [dispatch]
  );
};
