import { TTracker } from "../../types";
import { useStore } from "../provider";
import { db } from "../database";
import React from "react";

export async function trackerDelete(
  tracker: TTracker
): Promise<PouchDB.Core.Response | undefined> {
  try {
    const response = await db.trackers.remove(tracker);

    //  TODO
    //         // remove all associated page items
    //         pages: state.pages.map((page) => ({
    //           ...page,
    //           items: page.items.filter(
    //             (page) => !(page.type === "tracker" && page.id === action.payload)
    //           ),
    //         })),
    //         // remove all associated items
    //         inputs: state.inputs.filter(
    //           (input) => input.trackerId !== action.payload
    //         ),

    return response;
  } catch (err) {
    console.error(err);
  }
}

export const useTrackerDelete = () => {
  const { state, dispatch } = useStore();
  return React.useCallback(
    async (tracker: TTracker) => {
      const response = await trackerDelete(tracker);
      if (response?.ok) {
        const trackers = [...state.trackers];
        const trackerIndex = trackers.findIndex((t) => t._id === tracker._id);
        if (trackerIndex !== -1) {
          trackers.splice(trackerIndex, 1);
        }
        dispatch({ ...state, trackers });
      }
    },
    [state, dispatch]
  );
};
