import React from "react";
import { TInput } from "../../types";
import { db } from "../database";
import { useStore } from "../provider";
import { Actions } from "../reducer";

const LIMIT = 2;

type TQuery = {
  selector: {
    date?: {
      $lt?: string;
      $gte?: string;
    };
  };
  sort?: { [propName: string]: "desc" | "asc" }[];
  limit: number;
};

type TQueryArgs = {
  dateBefore?: string;
};

export async function inputsGetAll(
  args?: TQueryArgs
): Promise<TInput[] | undefined> {
  try {
    const query: TQuery = {
      selector: {},
      sort: [{ date: "desc" }],
      limit: LIMIT + 1, // uses 1 extra to check if there are more available for the next page
    };
    if (args?.dateBefore) {
      query.selector.date = { $lt: args?.dateBefore };
    }
    const response = await db.inputs.find(query);
    if (response?.docs) {
      return response.docs as TInput[];
    }
  } catch (err) {
    console.error(err);
  }
}

export const useInputsGetAll = () => {
  const { dispatch } = useStore();
  const [loading, setLoading] = React.useState(true);

  const [pageNumber, setPageNumber] = React.useState(1);
  const [inputIdsForPages, setInputIdsForPages] = React.useState<string[]>([]);
  const [hasNext, setHasNext] = React.useState(false);

  const load = React.useCallback(
    async (newPageNumber: number, args?: TQueryArgs) => {
      setLoading(true);
      setHasNext(false);
      dispatch({ type: Actions.SET_INPUTS, payload: [] });
      const inputs = await inputsGetAll(args);
      if (inputs) {
        const hasNext = inputs.length === LIMIT + 1;
        setHasNext(inputs.length === LIMIT + 1);
        if (hasNext) {
          setInputIdsForPages((arr) => {
            const newArr = [...arr];
            newArr[newPageNumber] = inputs[LIMIT - 1].date;
            return newArr;
          });
        }
        dispatch({ type: Actions.SET_INPUTS, payload: inputs.slice(0, LIMIT) });
      }
      setLoading(false);
    },
    [dispatch]
  );

  const next = React.useCallback(() => {
    load(pageNumber + 1, { dateBefore: inputIdsForPages[pageNumber] });
    setPageNumber(pageNumber + 1);
  }, [inputIdsForPages, load, pageNumber]);

  const previous = React.useCallback(() => {
    load(pageNumber - 1, { dateBefore: inputIdsForPages[pageNumber - 2] });
    setPageNumber(pageNumber - 1);
  }, [inputIdsForPages, load, pageNumber]);

  return {
    loading,
    load,
    next,
    previous,
    hasNext,
    hasPrevious: pageNumber > 1,
    pageNumber,
  };
};

export async function inputsGetAbsolutelyAllOfThem(): Promise<
  TInput[] | undefined
> {
  try {
    const response = await db.inputs.allDocs<TInput>({
      include_docs: true,
    });
    const inputs = response.rows.map((d) => d.doc).filter(Boolean) as TInput[];
    return inputs;
  } catch (err) {
    console.error(err);
  }
}
