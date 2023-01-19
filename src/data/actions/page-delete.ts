import { TPage } from "../../types";
import { useStore } from "../provider";
import { db } from "../database";
import React from "react";
import { Actions } from "../reducer";

export async function pageDelete(
  page: TPage
): Promise<PouchDB.Core.Response | undefined> {
  try {
    const response = await db.pages.remove(page);
    //  TODO remove page order somewhere
    return response;
  } catch (err) {
    console.error(err);
  }
}

export const usePageDelete = () => {
  const { dispatch } = useStore();
  return React.useCallback(
    async (page: TPage) => {
      const response = await pageDelete(page);
      if (response?.ok) {
        dispatch({ type: Actions.DELETE_PAGE, payload: page._id });
      }
    },
    [dispatch]
  );
};
