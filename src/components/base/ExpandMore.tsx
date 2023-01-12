import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";

type TUseExpandMoreProps = {
  iconLabelOpen: string;
  iconLabelClosed: string;
  defaultOpen?: boolean;
};

type TUseExpandMore = (props: TUseExpandMoreProps) => {
  icon: React.ReactNode;
  open: boolean;
};

export const useExpandMore: TUseExpandMore = ({
  iconLabelOpen,
  iconLabelClosed,
  defaultOpen,
}) => {
  const [open, setOpen] = React.useState(
    defaultOpen === undefined ? false : defaultOpen
  );

  return {
    icon: open ? (
      <IconButton
        size="small"
        aria-label={iconLabelOpen}
        onClick={() => setOpen(false)}
      >
        <ExpandLess />
      </IconButton>
    ) : (
      <IconButton
        size="small"
        aria-label={iconLabelClosed}
        onClick={() => setOpen(true)}
      >
        <ExpandMore />
      </IconButton>
    ),
    open,
  };
};
