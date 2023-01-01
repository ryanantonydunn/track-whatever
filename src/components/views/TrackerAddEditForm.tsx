import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React from "react";
import { filteredInputTypes } from "../../data/helpers";
import { TInputKey, TSliderValues, TTracker } from "../../types";
import { ChecklistEdit } from "../base/ChecklistEdit";
import { SliderEdit } from "../base/SliderEdit";

type TTrackerAddEditForm = {
  tracker: TTracker;
  setTracker: (tracker: TTracker) => void;
};

export const TrackerAddEditForm: React.FC<TTrackerAddEditForm> = ({
  tracker,
  setTracker,
}) => {
  return (
    <>
      <Box sx={{ p: 2 }}>
        <TextField
          fullWidth
          label="Title"
          value={tracker.title}
          error={!tracker.title}
          helperText={!tracker.title ? "Please enter a title" : ""}
          onChange={(e) => {
            setTracker({
              ...tracker,
              title: e.currentTarget.value.slice(0, 100),
            });
          }}
        />
        <FormControl fullWidth sx={{ mt: 4 }}>
          <InputLabel id="input-type-label">Input Type</InputLabel>
          <Select
            labelId="input-type-label"
            id="input-type"
            value={tracker.inputType}
            label="Input Type"
            onChange={(e) => {
              setTracker({
                ...tracker,
                inputType: e.target.value as TInputKey,
              });
            }}
          >
            {filteredInputTypes.map((inputType) => (
              <MenuItem key={inputType.id} value={inputType.id}>
                {inputType.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {tracker.inputType === "slider" && (
          <SliderEdit
            values={tracker.slider}
            setValues={(slider: TSliderValues) => {
              setTracker({ ...tracker, slider });
            }}
          />
        )}

        {tracker.inputType === "checklist" && (
          <ChecklistEdit
            items={tracker.items}
            setItems={(items: string[]) => {
              setTracker({ ...tracker, items });
            }}
          />
        )}
      </Box>
    </>
  );
};
