import { TTracker } from "../../types";
import { useStore } from "../setup";
import { db } from "../setup";

export const useTrackerCreate = () => {
  const { state, dispatch } = useStore();
  return async (tracker: TTracker) => {
    try {
      const response = await db.trackers.put(tracker);
      if (response.ok) {
        dispatch({
          ...state,
          trackers: [...state.trackers, tracker],
        });
      } else {
        console.error(response);
      }
    } catch (err) {
      console.error(err);
    }
  };
};
