import { Check, Close } from "@mui/icons-material";
import { TInputPrimitive } from "../types";

export function formatInputValue(value?: TInputPrimitive) {
  if (value === true) {
    return <Check aria-label="yes" />;
  }
  if (value === false) {
    return <Close aria-label="no" />;
  }
  return value?.toString();
}
