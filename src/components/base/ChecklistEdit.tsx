import { ArrowDownward, ArrowUpward, Delete, Edit } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useGetTracker } from "../../data/hooks";
import { useStore } from "../../data/provider";
import { Actions } from "../../data/reducer";
import { moveDown, moveUp } from "../../utils/reorder-array";
import { useConfirmDialog } from "./ConfirmDialog";
import { createBlankTracker } from "../../data/helpers";

type TChecklistEdit = {
  items?: string[];
  setItems: (items: string[]) => void;
};

export const ChecklistEdit: React.FC<TChecklistEdit> = ({
  items,
  setItems,
}) => {
  const getTracker = useGetTracker();
  const confirmDialog = useConfirmDialog();
  const { dispatch } = useStore();

  // set an id if we are editing an item, leave empty string if is a new item
  const [editingItemId, setEditingItemId] = React.useState("");
  const [editingModalOpen, setEditingModalOpen] = React.useState(false);
  const [itemText, setItemText] = React.useState("");
  React.useEffect(() => {
    const trackerItem = getTracker(editingItemId);
    setItemText(trackerItem?.title || "");
  }, [editingItemId, getTracker]);

  // set up blank items if not existing
  React.useEffect(() => {
    if (!items) {
      setItems([]);
    }
  }, [items, setItems]);
  if (!items) return null;

  return (
    <>
      <Typography variant="h6" component="h3" sx={{ p: 2, mt: 2 }}>
        Checklist Items
      </Typography>
      <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
        <List>
          {items.length ? (
            items.map((itemId, i) => {
              const item = getTracker(itemId);
              if (!item) return null;
              return (
                <ListItem disablePadding key={item.id}>
                  <ListItemText sx={{ p: 1, pl: 3 }}>{item.title}</ListItemText>
                  <ListItemSecondaryAction>
                    <IconButton
                      size="medium"
                      aria-label="move up"
                      onClick={() => {
                        setItems(moveUp(items, i));
                      }}
                    >
                      <ArrowUpward />
                    </IconButton>
                    <IconButton
                      size="medium"
                      aria-label="move down"
                      onClick={() => {
                        setItems(moveDown(items, i));
                      }}
                    >
                      <ArrowDownward />
                    </IconButton>
                    <IconButton
                      size="medium"
                      aria-label="edit item"
                      onClick={() => {
                        setEditingItemId(item.id);
                        setEditingModalOpen(true);
                      }}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      size="medium"
                      aria-label="delete item"
                      onClick={() => {
                        confirmDialog.open({
                          title: "Confirm delete item",
                          description:
                            "Are you sure you want to remove this item. This will remove all tracked information associated with this item.",
                          onConfirm: () => {
                            const newItems = [...items];
                            newItems.splice(i, 1);
                            setItems(newItems);
                            dispatch({
                              type: Actions.DELETE_TRACKER,
                              payload: item.id,
                            });
                          },
                        });
                      }}
                    >
                      <Delete />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })
          ) : (
            <Typography align="center" sx={{ p: 2 }}>
              No items yet, add some below
            </Typography>
          )}
        </List>
      </Box>
      <Box display="flex" justifyContent="flex-end" sx={{ p: 2 }}>
        <Button
          variant="text"
          size="small"
          onClick={() => {
            setEditingItemId("");
            setEditingModalOpen(true);
          }}
        >
          Add New Item
        </Button>
      </Box>
      <Dialog
        open={editingModalOpen}
        onClose={() => setEditingModalOpen(false)}
        scroll="body"
        aria-labelledby="add-tracker-title"
      >
        <DialogTitle id="scroll-dialog-title">
          {editingItemId ? "Edit" : "Add"} Item
        </DialogTitle>
        <DialogContent dividers sx={{ p: 2 }}>
          <TextField
            fullWidth
            label="Title"
            value={itemText}
            onChange={(e) => {
              setItemText(e.currentTarget.value.slice(0, 100));
            }}
          />
          <Box display="flex" justifyContent="flex-end" sx={{ pt: 2 }}>
            <Button
              variant="outlined"
              size="small"
              onClick={() => {
                setEditingModalOpen(false);
              }}
              sx={{ mr: 2 }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              size="small"
              onClick={() => {
                // update tracker
                if (editingItemId) {
                  const trackerItem = getTracker(editingItemId);
                  if (trackerItem) {
                    dispatch({
                      type: Actions.UPDATE_TRACKER,
                      payload: { ...trackerItem, title: itemText },
                    });
                  }
                } else {
                  // create new tracker
                  const newTracker = createBlankTracker();
                  dispatch({
                    type: Actions.CREATE_TRACKER,
                    payload: {
                      ...newTracker,
                      inputType: "checklistItem",
                      title: itemText,
                    },
                  });
                  setItems([...items, newTracker.id]);
                }
                setEditingModalOpen(false);
              }}
            >
              Save
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
      {confirmDialog.component}
    </>
  );
};
