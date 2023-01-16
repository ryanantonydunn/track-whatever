import { TTracker } from "../../types";
import { useStore } from "../setup";
import { db } from "../setup";

export const useTrackersGet = () => {
  const { state, dispatch } = useStore();
  return async () => {
    try {
      const response = await db.trackers.allDocs<TTracker>({
        include_docs: true,
      });
      const trackers = response.rows
        .map((d) => d.doc)
        .filter(Boolean) as TTracker[];
      dispatch({ ...state, trackers });
    } catch (err) {
      console.error(err);
    }
  };
};
