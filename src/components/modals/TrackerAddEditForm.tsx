import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React from "react";
import { TInputKey, TSliderValues, TTracker, inputTypes } from "../../types";
import { SliderEdit } from "../base/SliderEdit";

type TTrackerAddEditForm = {
  isEditing?: boolean;
  tracker: TTracker;
  setTracker: (tracker: TTracker) => void;
};

export const TrackerAddEditForm: React.FC<TTrackerAddEditForm> = ({
  isEditing,
  tracker,
  setTracker,
}) => {
  return (
    <>
      <Box sx={{ p: 2 }}>
        <TextField
          autoFocus
          fullWidth
          label="Title"
          value={tracker.title}
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
            disabled={isEditing}
          >
            {inputTypes.map((inputType) => (
              <MenuItem key={inputType._id} value={inputType._id}>
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
      </Box>
    </>
  );
};
