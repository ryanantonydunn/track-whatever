import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React from "react";
import { useStore } from "../../data/provider";
import { Actions } from "../../data/reducer";
import { TPage } from "../../types";
import { createBlankPage } from "../../utils/create-blank-data";

type TOpenArgs = {
  onSave?: (newPage: TPage) => void;
};

type TPageAdd = {
  open: (args?: TOpenArgs) => void;
  component: React.ReactNode;
};

export function usePageAdd(): TPageAdd {
  const { dispatch } = useStore();
  const [isOpen, setIsOpen] = React.useState(false);
  const [args, setArgs] = React.useState<TOpenArgs | undefined>();

  const open = (args?: TOpenArgs) => {
    setIsOpen(true);
    setArgs(args);
  };

  const [page, setPage] = React.useState(createBlankPage());

  const component = (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      aria-labelledby="page-add-title"
    >
      <DialogTitle id="page-add-title">Add a new page</DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 2 }}>
          <TextField
            fullWidth
            label="title"
            value={page.title}
            onChange={(e) =>
              setPage({ ...page, title: e.currentTarget.value.slice(0, 100) })
            }
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={() => setIsOpen(false)} variant="outlined">
          Cancel
        </Button>
        <Button
          onClick={() => {
            dispatch({ type: Actions.CREATE_PAGE, payload: page });
            args?.onSave?.(page);
            setIsOpen(false);
            setPage(createBlankPage());
          }}
          variant="contained"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );

  return { open, component };
}
