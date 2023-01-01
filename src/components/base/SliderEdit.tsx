import { Grid, TextField } from "@mui/material";
import React from "react";
import { TSliderValues } from "../../types";
import { isNumeric } from "../../utils/is-numeric";

type TSliderEdit = {
  values?: TSliderValues;
  setValues: (values: TSliderValues) => void;
};

export const SliderEdit: React.FC<TSliderEdit> = ({ values, setValues }) => {
  const [min, setMin] = React.useState("0");
  const [max, setMax] = React.useState("10");
  const [inc, setInc] = React.useState("1");
  const [minError, setMinError] = React.useState("");
  const [maxError, setMaxError] = React.useState("");
  const [incError, setIncError] = React.useState("");

  // when the values are updated
  React.useEffect(() => {
    // convert text fields to floats
    const minFloat = parseFloat(min);
    const maxFloat = parseFloat(max);
    const incFloat = parseFloat(inc);

    // work out errors
    let minError = "";
    let maxError = "";
    let incError = "";
    if (!isNumeric(min) || !isNumeric(max) || !isNumeric(inc)) {
      // if there are any non numeric values
      if (!isNumeric(min)) minError = "Number required";
      if (!isNumeric(max)) maxError = "Number required";
      if (!isNumeric(inc)) incError = "Number required";
      // validate numbers are possible for a slider
    } else {
      if (minFloat >= maxFloat) maxError = "Max must be above min";
      const difference = maxFloat - minFloat;
      const isDivisible = Number.isInteger(
        Math.round((difference / incFloat) * 100) / 100
      );
      if (!isDivisible)
        incError = "Must be divisible by difference between max and min";
    }

    // set error messages
    setMinError(minError);
    setMaxError(maxError);
    setIncError(incError);

    // update values in parent form if valid
    if (!minError && !maxError && !incError) {
      setValues({
        min: minFloat,
        max: maxFloat,
        increment: incFloat,
      });
    }
  }, [min, max, inc, setValues]);

  // set the initial temp values using the props
  // or send up the default values to the parent form
  React.useEffect(() => {
    if (values) {
      setMin(values.min.toString());
      setMax(values.max.toString());
      setInc(values.increment.toString());
    } else {
      setValues({
        min: parseFloat(min),
        max: parseFloat(max),
        increment: parseFloat(inc),
      });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Grid container spacing={2} columns={3} sx={{ mt: 2 }}>
      <Grid item xs={1}>
        <TextField
          label="Min"
          value={min}
          error={!!minError}
          helperText={minError}
          onChange={(e) => {
            setMin(e.currentTarget.value);
          }}
        />
      </Grid>
      <Grid item xs={1}>
        <TextField
          label="Max"
          value={max}
          error={!!maxError}
          helperText={maxError}
          onChange={(e) => {
            setMax(e.currentTarget.value);
          }}
        />
      </Grid>
      <Grid item xs={1}>
        <TextField
          label="Increment"
          value={inc}
          error={!!incError}
          helperText={incError}
          onChange={(e) => {
            setInc(e.currentTarget.value);
          }}
        />
      </Grid>
    </Grid>
  );
};
