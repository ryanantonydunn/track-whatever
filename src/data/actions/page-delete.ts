import { TPage } from "../../types";
import { useStore } from "../provider";
import { db } from "../database";
import React from "react";
import { Actions } from "../reducer";
import { useConfigUpdate } from "./config-update";

export async function pageDelete(
  page: TPage
): Promise<PouchDB.Core.Response | undefined> {
  try {
    const response = await db.pages.remove(page);
    return response;
  } catch (err) {
    console.error(err);
  }
}

export const usePageDelete = () => {
  const { state, dispatch } = useStore();
  const configUpdate = useConfigUpdate();
  return React.useCallback(
    async (page: TPage) => {
      const response = await pageDelete(page);
      if (response?.ok) {
        dispatch({ type: Actions.DELETE_PAGE, payload: page._id });

        // remove page from page order array
        configUpdate({
          pageOrder: state.config.pageOrder.filter((d) => d !== page._id),
        });
      }
    },
    [dispatch, state.config.pageOrder, configUpdate]
  );
};
