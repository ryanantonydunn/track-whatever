import { TTracker } from "../../types";
import { useStore } from "../provider";
import { db } from "../database";
import React from "react";
import { Actions } from "../reducer";
import { usePageUpdate } from "./page-update";

export async function trackerDelete(tracker: TTracker): Promise<void> {
  try {
    await db.trackers.remove(tracker);
  } catch (err) {
    console.error(err);
  }
}

export const useTrackerDelete = () => {
  const { state, dispatch } = useStore();
  const pageUpdate = usePageUpdate();
  return React.useCallback(
    async (tracker: TTracker) => {
      // remove tracker
      await trackerDelete(tracker);
      dispatch({ type: Actions.DELETE_TRACKER, payload: tracker._id });

      // remove any page items of this tracker
      for (let i = 0; i < state.pages.length; i++) {
        const page = state.pages[i];
        await pageUpdate({
          ...page,
          items: page.items.filter(
            (item) => !(item.type === "tracker" && item._id === tracker._id)
          ),
        });
      }

      // find all inputs of this tracker type
      // TODO
    },
    [dispatch, pageUpdate, state.pages]
  );
};
