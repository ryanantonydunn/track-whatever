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
  const [localValue, setLocalValue] = React.useState(value);
  React.useEffect(() => {
    setLocalValue(value);
  }, [value]);

  if (!tracker) return null;

  switch (tracker.inputType) {
    case "checkbox":
      return (
        <FormControlLabel
          control={
            <Checkbox
              size="medium"
              checked={!!value}
              onChange={(e) => {
                setValue(tracker._id, e.target.checked);
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
      const numValue = value !== undefined ? String(value) : "";
      return (
        <TextField
          label={tracker.title}
          fullWidth
          value={numValue}
          onChange={(e) => {
            const val = e.currentTarget.value;
            setLocalValue(val);
          }}
          onBlur={() => {
            if (typeof localValue !== "string") return;
            setValue(
              tracker._id,
              isNumeric(localValue) ? parseFloat(localValue) : ""
            );
          }}
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
        />
      );
    case "slider":
      if (!tracker.slider) return null;
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
          {value === undefined && (
            <div
              dangerouslySetInnerHTML={{
                __html: `<style>#slider-${tracker._id} .MuiSlider-thumb, #slider-${tracker._id} .MuiSlider-track {display: none;}</style>`,
              }}
            />
          )}
          <Stack direction="row" alignItems="center">
            <Slider
              id={`slider-${tracker._id}`}
              aria-labelledby={`${tracker.title}-label`}
              valueLabelDisplay="auto"
              defaultValue={tracker.slider.min || 0}
              step={tracker.slider.increment || 1}
              min={tracker.slider.min || 0}
              max={tracker.slider.max || 10}
              onChange={(e, newValue) => {
                setValue(tracker._id, newValue as number);
              }}
            />
            <IconButton
              size="small"
              aria-label="delete input"
              onClick={() => setValue(tracker._id, undefined)}
              sx={{ ml: 2 }}
              disabled={localValue === undefined}
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
          value={localValue || ""}
          onChange={(e) => {
            setLocalValue(e.currentTarget.value.slice(0, 10000));
          }}
          onBlur={() => {
            setValue(tracker._id, localValue);
          }}
        />
      );
    default:
      return null;
  }
};
