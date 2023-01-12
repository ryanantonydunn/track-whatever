import {
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputLabel,
  Slider,
  Stack,
  TextField,
} from "@mui/material";
import React from "react";
import { useTracker } from "../../data/hooks";
import { TInputPrimitive } from "../../types";
import { isNumeric } from "../../utils/is-numeric";
import { Delete } from "@mui/icons-material";

type TInputEntry = {
  trackerId: string;
  value?: TInputPrimitive;
  setValue: (trackerId: string, value: TInputPrimitive | undefined) => void;
};

export const InputEntry: React.FC<TInputEntry> = ({
  trackerId,
  value,
  setValue,
}) => {
  const tracker = useTracker(trackerId);
  if (!tracker) return null;
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
          sx={{
            border: 1,
            borderRadius: "5px",
            borderColor: "grey.400",
            width: "99%",
            ml: 0,
            mr: 0,
          }}
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
      if (typeof value === "number") {
        parsedValue = value;
      }
      return (
        <Box
          sx={{
            pl: 2,
            pr: 2,
            pt: 1,
            pb: 1,
            flex: 1,
            border: 1,
            borderRadius: "5px",
            borderColor: "grey.400",
          }}
        >
          <InputLabel shrink id={`${tracker.title}-label`}>
            {tracker.title}
          </InputLabel>
          {parsedValue === undefined && (
            <div
              dangerouslySetInnerHTML={{
                __html: `<style>#slider-${tracker.id} .MuiSlider-thumb, #slider-${tracker.id} .MuiSlider-track {display: none;}</style>`,
              }}
            />
          )}
          <Stack direction="row" alignItems="center">
            <Slider
              id={`slider-${tracker.id}`}
              aria-labelledby={`${tracker.title}-label`}
              valueLabelDisplay="auto"
              defaultValue={tracker.slider.min || 0}
              step={tracker.slider.increment || 1}
              min={tracker.slider.min || 0}
              max={tracker.slider.max || 10}
              value={parsedValue}
              onChange={(e, newValue) =>
                setValue(tracker.id, newValue as number)
              }
            />
            <IconButton
              size="small"
              aria-label="delete input"
              onClick={() => setValue(tracker.id, undefined)}
              sx={{ ml: 2 }}
              disabled={parsedValue === undefined}
            >
              <Delete />
            </IconButton>
          </Stack>
        </Box>
      );
    case "text":
      return (
        <TextField
          label={tracker.title}
          rows={3}
          fullWidth
          multiline
          value={value || ""}
          onChange={(e) => {
            setValue(tracker.id, e.currentTarget.value.slice(0, 100));
          }}
        />
      );
    default:
      return null;
  }
};
