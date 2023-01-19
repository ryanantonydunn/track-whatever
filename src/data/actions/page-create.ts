import { TPage } from "../../types";
import { useStore } from "../provider";
import { db } from "../database";
import React from "react";

export async function pageCreate(newPage: TPage): Promise<TPage | undefined> {
  try {
    const response = await db.pages.put(newPage);
    if (response.ok) {
      const refetch = await db.pages.get<TPage>(newPage._id);
      return refetch;
    } else {
      console.error(response);
    }
  } catch (err) {
    console.error(err);
  }
}

export const usePageCreate = () => {
  const { state, dispatch } = useStore();
  return React.useCallback(
    async (page: TPage) => {
      const newPage = await pageCreate(page);
      if (newPage) {
        dispatch({
          ...state,
          pages: [...state.pages, newPage],
        });
      }
    },
    [state, dispatch]
  );
};
