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

  let mainComponent;
  switch (tracker.inputType) {
    case "checkbox":
      mainComponent = (
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
          sx={{ pl: 2, display: "flex" }}
          label={tracker.title}
        />
      );
      break;
    case "number":
      const numValue = localValue !== undefined ? String(localValue) : "";
      mainComponent = (
        <>
          <InputLabel shrink id={`${tracker._id}-label`} sx={{ px: 2, pt: 1 }}>
            {tracker.title}
          </InputLabel>
          <TextField
            aria-labelledby={`${tracker._id}-label`}
            fullWidth
            value={numValue}
            onChange={(e) => {
              setLocalValue(e.currentTarget.value);
            }}
            onBlur={() => {
              if (typeof localValue !== "string") return;
              setValue(
                tracker._id,
                isNumeric(localValue) ? parseFloat(localValue) : ""
              );
            }}
            inputProps={{
              inputMode: "numeric",
              pattern: "[0-9]*",
              sx: { py: 1, px: 2, marginTop: "-8px" },
            }}
            sx={{
              "& fieldset": { border: "none" },
            }}
          />
        </>
      );
      break;
    case "slider":
      if (!tracker.slider) return null;
      const sliderValue =
        typeof localValue === "number" ? localValue : tracker.slider.min;
      mainComponent = (
        <Box sx={{ px: 2 }}>
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
          <Slider
            id={`slider-${tracker._id}`}
            aria-labelledby={`${tracker.title}-label`}
            valueLabelDisplay="auto"
            value={sliderValue}
            step={tracker.slider.increment || 1}
            min={tracker.slider.min || 0}
            max={tracker.slider.max || 10}
            onChange={(e, newValue) => {
              setValue(tracker._id, newValue as number);
            }}
          />
        </Box>
      );
      break;
    case "text":
      mainComponent = (
        <>
          <InputLabel shrink id={`${tracker._id}-label`} sx={{ px: 2, pt: 1 }}>
            {tracker.title}
          </InputLabel>
          <TextField
            aria-labelledby={`${tracker._id}-label`}
            rows={3}
            fullWidth
            multiline
            value={localValue || ""}
            onChange={(e) => {
              setLocalValue(e.currentTarget.value);
            }}
            onBlur={() => {
              setValue(tracker._id, localValue);
            }}
            inputProps={{
              sx: { py: 1, px: 2, marginTop: "-8px" },
            }}
            sx={{
              "& fieldset": { border: "none" },
              "& > div": { p: 0 },
            }}
          />
        </>
      );
      break;
    default:
  }

  return (
    <Stack direction="row" alignItems="center" sx={{ pr: 1 }}>
      <Box sx={{ flex: 1 }}>{mainComponent}</Box>
      <Box sx={{ width: "34px", height: "34px" }}>
        {localValue !== undefined ? (
          <IconButton
            size="small"
            aria-label="delete input"
            onClick={() => setValue(tracker._id, undefined)}
          >
            <Delete />
          </IconButton>
        ) : null}
      </Box>
    </Stack>
  );
};
