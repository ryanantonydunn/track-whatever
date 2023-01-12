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
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { usePages } from "../../data/hooks";
import { useStore } from "../../data/provider";
import { Actions } from "../../data/reducer";
import { useConfirmDialog } from "../base/ConfirmDialog";
import { Layout } from "../base/Layout";
import { usePageAdd } from "../modals/PageAdd";

export const PageListEdit: React.FC = () => {
  const { dispatch } = useStore();
  const pages = usePages();
  const confirmDialog = useConfirmDialog();
  const navigate = useNavigate();
  const pageAdd = usePageAdd();

  return (
    <Layout title="Edit Pages" back="/">
      <Container maxWidth="md">
        <Paper>
          <List>
            {pages.length ? (
              pages.map((page, i) => {
                return (
                  <ListItem disablePadding key={page.id}>
                    <ListItemText sx={{ p: 1, pl: 3 }}>
                      {page.title}
                    </ListItemText>
                    <ListItemSecondaryAction>
                      <IconButton
                        size="medium"
                        aria-label="move down"
                        onClick={() => {
                          dispatch({
                            type: Actions.REORDER_PAGES,
                            payload: {
                              oldIndex: i,
                              newIndex: i + 1,
                            },
                          });
                        }}
                      >
                        <ArrowDownward />
                      </IconButton>
                      <IconButton
                        size="medium"
                        aria-label="move up"
                        onClick={() => {
                          dispatch({
                            type: Actions.REORDER_PAGES,
                            payload: {
                              oldIndex: i,
                              newIndex: i - 1,
                            },
                          });
                        }}
                      >
                        <ArrowUpward />
                      </IconButton>
                      <IconButton
                        size="medium"
                        aria-label="edit page"
                        component={Link}
                        to={`/edit-page/${page.id}`}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        size="medium"
                        aria-label="delete page"
                        onClick={() => {
                          confirmDialog.open({
                            title: "Confirm delete page",
                            description:
                              "Are you sure you want to delete this page. This will not delete your trackers, you can add them to a different page later.",
                            onConfirm: () => {
                              dispatch({
                                type: Actions.DELETE_PAGE,
                                payload: page.id,
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
                No pages yet, add a new one below
              </Typography>
            )}
          </List>
        </Paper>
        <Box display="flex" justifyContent="flex-end" sx={{ p: 2 }}>
          <Button
            variant="text"
            size="small"
            onClick={() => {
              pageAdd.open({
                onSave: (newPage) => {
                  navigate(`/edit-page/${newPage.id}`);
                },
              });
            }}
          >
            Add New Page
          </Button>
        </Box>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="flex-end"
          sx={{ p: 2 }}
        >
          <Button
            fullWidth
            variant="contained"
            size="large"
            component={Link}
            to={`/`}
          >
            Done
          </Button>
        </Box>
      </Container>
      {pageAdd.component}
      {confirmDialog.component}
    </Layout>
  );
};
