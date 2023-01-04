import { Checkbox, FormControlLabel, Slider, TextField } from "@mui/material";
import React from "react";
import { TInputPrimitive, TTracker } from "../../types";
import { isNumeric } from "../../utils/is-numeric";

type TTrackInput = {
  tracker: TTracker;
  value?: TInputPrimitive;
  setValue: (trackerId: string, value: TInputPrimitive) => void;
};

export const TrackInput: React.FC<TTrackInput> = ({
  tracker,
  value,
  setValue,
}) => {
  let parsedValue;
  switch (tracker.inputType) {
    case "checkbox":
      return (
        <FormControlLabel
          control={
            <Checkbox
              size="medium"
              checked={!!value}
              onChange={(e) => {
                setValue(tracker.id, e.target.checked);
              }}
            />
          }
          label={tracker.title}
        />
      );
    case "number":
      return (
        <TextField
          label={tracker.title}
          fullWidth
          value={value || ""}
          onChange={(e) => {
            const val = e.currentTarget.value;
            setValue(tracker.id, isNumeric(val) ? parseFloat(val) : "");
          }}
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
        />
      );
    case "slider":
      if (!tracker.slider) return null;
      if (typeof value === "undefined") {
        parsedValue = tracker.slider.min;
      } else if (typeof value === "number") {
        parsedValue = value;
      } else {
        parsedValue = 0;
      }
      return (
        <Slider
          valueLabelDisplay="auto"
          defaultValue={tracker.slider.min || 0}
          step={tracker.slider.increment || 1}
          min={tracker.slider.min || 0}
          max={tracker.slider.max || 10}
          value={parsedValue}
          onChange={(e, newValue) => setValue(tracker.id, newValue as number)}
        />
      );
    case "text":
      return (
        <TextField
          label={tracker.title}
          rows={2}
          fullWidth
          multiline
          value={value || ""}
          onChange={(e) => {
            setValue(tracker.id, e.currentTarget.value);
          }}
        />
      );
    default:
      return null;
  }
};
