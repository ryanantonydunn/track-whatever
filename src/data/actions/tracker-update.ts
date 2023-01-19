import { TTracker } from "../../types";
import { useStore } from "../provider";
import { db } from "../database";
import React from "react";

export async function trackerUpdate(
  tracker: TTracker
): Promise<TTracker | undefined> {
  try {
    const response = await db.trackers.put(tracker);
    if (response.ok) {
      const refetch = await db.trackers.get<TTracker>(tracker._id);
      return refetch;
    } else {
      console.error(response);
    }
  } catch (err) {
    console.error(err);
  }
}

export const useTrackerUpdate = () => {
  const { state, dispatch } = useStore();
  return React.useCallback(
    async (tracker: TTracker) => {
      const updatedTracker = await trackerUpdate(tracker);
      if (updatedTracker) {
        dispatch({
          ...state,
          trackers: state.trackers.map((tracker) =>
            tracker._id === updatedTracker._id ? updatedTracker : tracker
          ),
        });
      }
    },
    [state, dispatch]
  );
};
