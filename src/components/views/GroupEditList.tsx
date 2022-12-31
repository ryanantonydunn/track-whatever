import { ArrowDownward, ArrowUpward, Delete, Edit } from "@mui/icons-material";
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

export const GroupEditList: React.FC = () => {
  const confirmDialog = useConfirmDialog();
  const { state, dispatch } = useStore();

  return (
    <Layout title="Edit Groups">
      <Container maxWidth="sm">
        <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
          <List>
            {state.groups.length ? (
              state.groups.map((group, i) => (
                <ListItem disablePadding key={group.id}>
                  <ListItemText sx={{ p: 1, pl: 3 }}>
                    {group.title}
                  </ListItemText>
                  <ListItemSecondaryAction>
                    <IconButton
                      size="medium"
                      aria-label="move up"
                      onClick={() => {
                        dispatch({ type: Actions.MOVE_GROUP_UP, payload: i });
                      }}
                    >
                      <ArrowUpward />
                    </IconButton>
                    <IconButton
                      size="medium"
                      aria-label="move down"
                      onClick={() => {
                        dispatch({ type: Actions.MOVE_GROUP_DOWN, payload: i });
                      }}
                    >
                      <ArrowDownward />
                    </IconButton>
                    <IconButton
                      size="medium"
                      aria-label="edit group"
                      component={Link}
                      to={`/edit-group/${group.id}`}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      size="medium"
                      aria-label="delete group"
                      onClick={() => {
                        confirmDialog.open({
                          title: "Confirm delete group",
                          description:
                            "Are you sure you want to remove this group. This will not remove your trackers, only the group display page. You can add them to a different group later.",
                          onConfirm: () => {
                            dispatch({
                              type: Actions.DELETE_GROUP,
                              payload: group.id,
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
                No groups to edit
              </Typography>
            )}
          </List>
        </Box>
        <Box display="flex" justifyContent="flex-end" sx={{ p: 2 }}>
          <Button variant="text" size="small" component={Link} to="/add-group">
            Add New Group
          </Button>
        </Box>
      </Container>
      {confirmDialog.component}
    </Layout>
  );
};
