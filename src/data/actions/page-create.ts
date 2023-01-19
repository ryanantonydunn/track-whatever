import React from "react";
import { TPage } from "../../types";
import { db } from "../database";
import { useStore } from "../provider";
import { Actions } from "../reducer";
import { useConfigUpdate } from "./config-update";

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
  const configUpdate = useConfigUpdate();
  return React.useCallback(
    async (page: TPage) => {
      const newPage = await pageCreate(page);
      if (newPage) {
        dispatch({ type: Actions.CREATE_PAGE, payload: newPage });

        // add page id to the pageOrder array
        configUpdate({ pageOrder: [...state.config.pageOrder, newPage._id] });
      }
    },
    [dispatch, configUpdate, state.config.pageOrder]
  );
};
