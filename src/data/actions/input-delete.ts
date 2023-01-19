import { TInput } from "../../types";
import { useStore } from "../provider";
import { db } from "../database";
import React from "react";

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
  const { state, dispatch } = useStore();
  return React.useCallback(
    async (input: TInput) => {
      const response = await inputDelete(input);
      if (response?.ok) {
        const inputs = [...state.inputs];
        const inputIndex = inputs.findIndex((t) => t._id === input._id);
        if (inputIndex !== -1) {
          inputs.splice(inputIndex, 1);
        }
        dispatch({ ...state, inputs });
      }
    },
    [state, dispatch]
  );
};
