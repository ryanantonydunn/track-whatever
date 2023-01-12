import { Delete, Edit, FormatListNumbered } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { useStore } from "../../data/provider";
import { Actions } from "../../data/reducer";
import { useConfirmDialog } from "../base/ConfirmDialog";
import { Layout } from "../base/Layout";
import { useTrackerAdd } from "../modals/TrackerAdd";
import { useTrackerEdit } from "../modals/TrackerEdit";

export const TrackerList: React.FC = () => {
  const confirmDialog = useConfirmDialog();
  const trackerEdit = useTrackerEdit();
  const trackerAdd = useTrackerAdd();

  const { state, dispatch } = useStore();

  return (
    <Layout title="Trackers" back="/">
      <Container maxWidth="md">
        <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
          <List>
            {state.trackers.length ? (
              state.trackers.map((tracker) => (
                <ListItem disablePadding key={tracker.id}>
                  <ListItemText sx={{ p: 1, pl: 3 }}>
                    {tracker.title}
                  </ListItemText>
                  <ListItemSecondaryAction>
                    <IconButton
                      size="medium"
                      aria-label="view inputs"
                      component={Link}
                      to={`/tracker/${tracker.id}`}
                    >
                      <FormatListNumbered />
                    </IconButton>
                    <IconButton
                      size="medium"
                      aria-label="edit tracker"
                      onClick={() => {
                        trackerEdit.open({ trackerId: tracker.id });
                      }}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      size="medium"
                      aria-label="delete tracker"
                      onClick={() => {
                        confirmDialog.open({
                          title: "Confirm delete tracker",
                          description:
                            "Are you sure you want to remove this tracker, this will remove all associated input data.",
                          onConfirm: () => {
                            dispatch({
                              type: Actions.DELETE_TRACKER,
                              payload: tracker.id,
                            });
                          },
                        });
                      }}
                    >
                      <Delete />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))
            ) : (
              <Typography align="center" sx={{ p: 2 }}>
                No trackers to edit
              </Typography>
            )}
          </List>
        </Box>
        <Box display="flex" justifyContent="flex-end" sx={{ p: 2 }}>
          <Button
            variant="text"
            size="small"
            onClick={() => {
              trackerAdd.open();
            }}
          >
            Add New Tracker
          </Button>
        </Box>
      </Container>
      {trackerEdit.component}
      {trackerAdd.component}
      {confirmDialog.component}
    </Layout>
  );
};
