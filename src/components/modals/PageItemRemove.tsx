import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import React from "react";
import { usePageUpdate } from "../../data/actions/page-update";
import { useTrackerDelete } from "../../data/actions/tracker-delete";
import { useTracker } from "../../data/hooks";
import { TPage, TPageItem } from "../../types";
import { useConfirmDialog } from "./ConfirmDialog";

type TOpenArgs = {
  page: TPage;
  itemIndex: number;
  item: TPageItem;
};

type TPageItemRemove = {
  open: (args?: TOpenArgs) => void;
  component: React.ReactNode;
};

export function usePageItemRemove(): TPageItemRemove {
  const [isOpen, setIsOpen] = React.useState(false);
  const [args, setArgs] = React.useState<TOpenArgs | undefined>();
  const confirmDialog = useConfirmDialog();
  const trackerDelete = useTrackerDelete();
  const pageUpdate = usePageUpdate();
  const tracker = useTracker(args?.item._id);

  const close = () => {
    setIsOpen(false);
    setArgs(undefined);
  };

  const open = (args?: TOpenArgs) => {
    if (args?.item.type === "tracker") {
      setIsOpen(true);
      setArgs(args);
    } else {
    }
    // TODO other types of page item
  };

  const deleteOnlyFromPage = async () => {
    if (!args?.page || args.itemIndex === undefined) return;
    const newItems = [...args.page.items];
    newItems.splice(args.itemIndex, 1);
    pageUpdate({ ...args.page, items: newItems });
    close();
  };

  const component = (
    <>
      <Dialog
        open={isOpen}
        onClose={() => {
          close();
        }}
        aria-labelledby="page-add-title"
      >
        <DialogTitle id="page-add-title">Remove tracker</DialogTitle>
        <DialogContent sx={{ p: 0 }}>
          <List>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  deleteOnlyFromPage();
                }}
              >
                <ListItemText primary="Remove tracker only from page" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  confirmDialog.open({
                    title: "Confirm delete tracker",
                    description:
                      "Are you sure you want to remove this tracker, this will remove all associated input data.",
                    onConfirm: () => {
                      if (tracker) trackerDelete(tracker);
                    },
                  });
                  close();
                }}
              >
                <ListItemText primary="Delete tracker and all data" />
              </ListItemButton>
            </ListItem>
          </List>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={() => {
              close();
            }}
            variant="outlined"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      {confirmDialog.component}
    </>
  );

  return { open, component };
}
