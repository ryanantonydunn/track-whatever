import {
  ArrowDownward,
  ArrowUpward,
  Close,
  Edit,
  FormatListNumbered,
  TrendingUp,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { useGetTracker, usePage } from "../../data/hooks";
import { TPageItem } from "../../types";
import { reorderArray } from "../../utils/reorder-array";
import { useConfirmDialog } from "../base/ConfirmDialog";
import { Layout } from "../base/Layout";
import { usePageItemAdd } from "../modals/PageItemAdd";
import { useTrackerEdit } from "../modals/TrackerEdit";

type TParams = {
  pageId: string;
};

export const PageEdit: React.FC = () => {
  const { pageId } = useParams<TParams>();
  const page = usePage(pageId);
  const trackerEdit = useTrackerEdit();
  const confirmDialog = useConfirmDialog();
  const pageItemAdd = usePageItemAdd();
  if (!page) return null;

  return (
    <Layout title="Edit Page" back={`/edit-pages`}>
      <Container maxWidth="md" sx={{ pt: 2 }}>
        <TextField
          fullWidth
          label="Title"
          value={page.title}
          onChange={(e) => {
            // dispatch({
            //   type: Actions.UPDATE_PAGE,
            //   payload: { ...page, title: e.currentTarget.value.slice(0, 100) },
            // });
            // TODO
          }}
        />
        <Typography variant="h6" component="h3" sx={{ p: 2, mt: 2 }}>
          Page Items
        </Typography>
        <Paper>
          <List>
            {page.items.length ? (
              page.items.map((item, i) => {
                return (
                  <ListItem key={item._id}>
                    <PageEditItem item={item} />
                    <ListItemSecondaryAction>
                      <IconButton
                        size="medium"
                        aria-label="move down"
                        onClick={() => {
                          // dispatch({
                          //   type: Actions.UPDATE_PAGE,
                          //   payload: {
                          //     ...page,
                          //     items: reorderArray(page.items, i, i + 1),
                          //   },
                          // });
                          // TODO
                        }}
                      >
                        <ArrowDownward />
                      </IconButton>
                      <IconButton
                        size="medium"
                        aria-label="move up"
                        onClick={() => {
                          // dispatch({
                          //   type: Actions.UPDATE_PAGE,
                          //   payload: {
                          //     ...page,
                          //     items: reorderArray(page.items, i, i - 1),
                          //   },
                          // });
                          // TODO
                        }}
                      >
                        <ArrowUpward />
                      </IconButton>
                      {item.type === "tracker" ? (
                        <>
                          <IconButton
                            size="medium"
                            aria-label="view inputs"
                            component={Link}
                            to={`/tracker/${item?._id || ""}`}
                          >
                            <FormatListNumbered />
                          </IconButton>
                          <IconButton
                            size="medium"
                            aria-label="edit tracker"
                            onClick={() => {
                              trackerEdit.open({ trackerId: item?._id || "" });
                            }}
                          >
                            <Edit />
                          </IconButton>
                        </>
                      ) : (
                        <>
                          <IconButton size="medium"></IconButton>
                          <IconButton size="medium"></IconButton>
                        </>
                      )}
                      <IconButton
                        size="medium"
                        aria-label="remove item"
                        onClick={() => {
                          confirmDialog.open({
                            title: "Confirm remove item",
                            description:
                              "Are you sure you want to remove this item. This will not delete any trackers, you can add them to a different page later.",
                            onConfirm: () => {
                              const newItems = [...page.items];
                              newItems.splice(i, 1);
                              // dispatch({
                              //   type: Actions.UPDATE_PAGE,
                              //   payload: { ...page, items: newItems },
                              // });
                              // TODO
                            },
                          });
                        }}
                      >
                        <Close />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                );
              })
            ) : (
              <Typography align="center" sx={{ p: 2 }}>
                No items yet, add a new one below
              </Typography>
            )}
          </List>
        </Paper>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="flex-end"
          sx={{ p: 2 }}
        >
          <Button
            variant="text"
            size="small"
            component={Link}
            to={`/page/${page._id}`}
            sx={{ mr: 2 }}
          >
            View This Page
          </Button>
          <Button
            variant="text"
            size="small"
            onClick={() => {
              pageItemAdd.open({ page });
            }}
          >
            Add New Item
          </Button>
        </Box>
      </Container>
      {pageItemAdd.component}
      {trackerEdit.component}
      {confirmDialog.component}
    </Layout>
  );
};

const PageEditItem: React.FC<{ item: TPageItem }> = ({ item }) => {
  const getTracker = useGetTracker();
  if (item.type === "tracker") {
    const tracker = getTracker(item._id);
    if (!tracker) return null;
    return (
      <>
        <ListItemIcon>
          <TrendingUp />
        </ListItemIcon>
        <ListItemText>{tracker.title}</ListItemText>
      </>
    );
  }
  return null;
};
