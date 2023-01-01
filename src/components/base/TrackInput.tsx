import { Checkbox, FormControlLabel, Stack } from "@mui/material";
import React from "react";
import { TInputPrimitive, TTracker } from "../../types";

type TTrackInput = {
  tracker: TTracker;
  value?: TInputPrimitive;
  setValue: (value: TInputPrimitive) => void;
};

export const TrackInput: React.FC<TTrackInput> = ({
  tracker,
  value,
  setValue,
}) => {
  if (tracker.inputType === "boolean") {
    return (
      <FormControlLabel
        control={
          <Checkbox
            size="medium"
            onChange={(e) => setValue(e.target.value === "on")}
          />
        }
        label={tracker.title}
      />
    );
  }
  return null;
};
