import { TPage } from "../../types";
import { useStore } from "../provider";
import { db } from "../database";
import React from "react";

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
  const { state, dispatch } = useStore();
  return React.useCallback(
    async (page: TPage) => {
      const newPage = await pageUpdate(page);
      if (newPage) {
        const pages: TPage[] = state.pages.map((d) =>
          d._id === newPage._id ? newPage : d
        );
        dispatch({ pages });
      }
    },
    [state.pages, dispatch]
  );
};
