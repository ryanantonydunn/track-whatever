import { TInput } from "../../types";
import { useStore } from "../provider";
import { db } from "../database";
import React from "react";
import { Actions } from "../reducer";

export async function inputDelete(
  input: TInput
): Promise<PouchDB.Core.Response | undefined> {
  try {
    const response = await db.inputs.remove(input);
    return response;
  } catch (err) {
    console.error(err);
  }
}

export const useInputDelete = () => {
  const { dispatch } = useStore();
  return React.useCallback(
    async (input: TInput) => {
      const response = await inputDelete(input);
      if (response?.ok) {
        dispatch({ type: Actions.DELETE_INPUT, payload: input._id });
      }
    },
    [dispatch]
  );
};
