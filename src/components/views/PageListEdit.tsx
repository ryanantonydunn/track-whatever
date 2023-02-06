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
import { useConfirmDialog } from "../modals/ConfirmDialog";
import { Layout } from "../base/Layout";
import { usePageAdd } from "../modals/PageAdd";
import { usePageDelete } from "../../data/actions/page-delete";
import { useConfigUpdate } from "../../data/actions/config-update";
import { reorderArray } from "../../utils/reorder-array";
import { useStore } from "../../data/provider";

export const PageListEdit: React.FC = () => {
  const pages = usePages();
  const confirmDialog = useConfirmDialog();
  const navigate = useNavigate();
  const pageAdd = usePageAdd();
  const pageDelete = usePageDelete();

  const { state } = useStore();
  const configUpdate = useConfigUpdate();

  return (
    <Layout title="Edit Pages" back="/">
      <Container maxWidth="md">
        <Paper>
          <List>
            {pages.length ? (
              pages.map((page, i) => {
                return (
                  <ListItem disablePadding key={page._id}>
                    <ListItemText sx={{ p: 1, pl: 3 }}>
                      {page.title}
                    </ListItemText>
                    <ListItemSecondaryAction>
                      <IconButton
                        size="medium"
                        aria-label="move down"
                        onClick={() => {
                          configUpdate({
                            pageOrder: reorderArray(
                              state.config.pageOrder,
                              i,
                              i + 1
                            ),
                          });
                        }}
                      >
                        <ArrowDownward />
                      </IconButton>
                      <IconButton
                        size="medium"
                        aria-label="move up"
                        onClick={() => {
                          configUpdate({
                            pageOrder: reorderArray(
                              state.config.pageOrder,
                              i,
                              i - 1
                            ),
                          });
                        }}
                      >
                        <ArrowUpward />
                      </IconButton>
                      <IconButton
                        size="medium"
                        aria-label="edit page"
                        component={Link}
                        to={`/edit-page/${page._id}`}
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
                            onConfirm: async () => {
                              await pageDelete(page);
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
                  navigate(`/edit-page/${newPage._id}`);
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
