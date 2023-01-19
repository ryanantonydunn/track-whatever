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
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { useConfirmDialog } from "../base/ConfirmDialog";
import { Layout } from "../base/Layout";
import { useTrackerAdd } from "../modals/TrackerAdd";
import { useTrackerEdit } from "../modals/TrackerEdit";
import { useStore } from "../../data/provider";
import { useTrackerDelete } from "../../data/actions/tracker-delete";

export const TrackerList: React.FC = () => {
  const confirmDialog = useConfirmDialog();
  const trackerEdit = useTrackerEdit();
  const trackerAdd = useTrackerAdd();
  const trackerDelete = useTrackerDelete();

  const { state } = useStore();

  return (
    <Layout title="Trackers" back="/">
      <Container maxWidth="md">
        <Paper>
          <List>
            {state.trackers.length ? (
              state.trackers.map((tracker) => (
                <ListItem disablePadding key={tracker._id}>
                  <ListItemText sx={{ p: 1, pl: 3 }}>
                    {tracker.title}
                  </ListItemText>
                  <ListItemSecondaryAction>
                    <IconButton
                      size="medium"
                      aria-label="view inputs"
                      component={Link}
                      to={`/tracker/${tracker._id}`}
                    >
                      <FormatListNumbered />
                    </IconButton>
                    <IconButton
                      size="medium"
                      aria-label="edit tracker"
                      onClick={() => {
                        trackerEdit.open({ trackerId: tracker._id });
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
                          onConfirm: async () => {
                            await trackerDelete(tracker);
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
        </Paper>
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
