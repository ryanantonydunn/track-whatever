import { Check, Close } from "@mui/icons-material";
import React from "react";
import { useGetTracker } from "../../data/hooks";
import { TInput } from "../../types";

type TInputValue = {
  input: TInput;
  hideText?: boolean;
};

export const InputValue: React.FC<TInputValue> = ({ input, hideText }) => {
  const getTracker = useGetTracker();
  const trackerType = React.useMemo(
    () => getTracker(input.trackerId)?.inputType || "",
    [input, getTracker]
  );

  if (trackerType === "checkbox") {
    return input.value ? (
      <Check fontSize="small" aria-label="yes" />
    ) : (
      <Close aria-label="no" />
    );
  }
  if (hideText && trackerType === "text") {
    return <>{input.value}</>;
  }
  return <>{input.value?.toString()}</>;
};
