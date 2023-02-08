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
import { TPage, TPageItemType } from "../../types";
import { TrackerMenuList } from "../base/TrackerMenuList";
import { useTrackerAdd } from "./TrackerAdd";

type TOpenArgs = {
  page: TPage;
};

type TPageItemAdd = {
  open: (args?: TOpenArgs) => void;
  component: React.ReactNode;
};

export function usePageItemAdd(): TPageItemAdd {
  const trackerAdd = useTrackerAdd();
  const [isOpen, setIsOpen] = React.useState(false);
  const [args, setArgs] = React.useState<TOpenArgs | undefined>();
  const [menu, setMenu] = React.useState<"type" | "existingTracker">("type");
  const pageUpdate = usePageUpdate();

  const close = () => {
    setMenu("type");
    setIsOpen(false);
    setArgs(undefined);
  };

  const open = (args?: TOpenArgs) => {
    setIsOpen(true);
    setArgs(args);
  };

  const save = async (type: TPageItemType, _id?: string) => {
    if (!args?.page) return;
    await pageUpdate({
      ...args.page,
      items: [...args.page.items, { _id, type }],
    });
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
        <DialogTitle id="page-add-title">Add tracker to page</DialogTitle>
        <DialogContent sx={{ p: 0 }}>
          {menu === "type" && (
            <List>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => {
                    trackerAdd.open({
                      pageId: args?.page._id || "",
                    });
                  }}
                >
                  <ListItemText primary="New Tracker" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={() => setMenu("existingTracker")}>
                  <ListItemText primary="Existing Tracker" />
                </ListItemButton>
              </ListItem>
            </List>
          )}
          {menu === "existingTracker" && (
            <TrackerMenuList
              onClick={(tracker) => {
                save("tracker", tracker._id);
              }}
              disableIds={(args?.page.items || [])
                .filter((item) => item.type === "tracker")
                .map((item) => item._id || "")}
            />
          )}
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
      {trackerAdd.component}
    </>
  );

  return { open, component };
}
