import { TPage } from "../../types";
import { useStore } from "../provider";
import { db } from "../database";
import React from "react";

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
  const { state, dispatch } = useStore();
  return React.useCallback(
    async (page: TPage) => {
      const response = await pageDelete(page);
      if (response?.ok) {
        const pages = [...state.pages];
        const pageIndex = pages.findIndex((t) => t._id === page._id);
        if (pageIndex !== -1) {
          pages.splice(pageIndex, 1);
        }
        dispatch({ ...state, pages });
      }
    },
    [state, dispatch]
  );
};
