import { TPage } from "../../types";
import { useStore } from "../provider";
import { db } from "../database";
import React from "react";
import { Actions } from "../reducer";

export async function pageUpdate(page: TPage): Promise<TPage | undefined> {
  try {
    const response = await db.pages.put(page);
    if (response.ok) {
      const refetch = await db.pages.get<TPage>(page._id);
      return refetch;
    } else {
      console.error(response);
    }
  } catch (err) {
    console.error(err);
  }
}

export const usePageUpdate = () => {
  const { dispatch } = useStore();
  return React.useCallback(
    async (page: TPage) => {
      const newPage = await pageUpdate(page);
      if (newPage) {
        dispatch({ type: Actions.UPDATE_PAGE, payload: newPage });
      }
    },
    [dispatch]
  );
};
