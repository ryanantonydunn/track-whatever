import { Add, MoreVert } from "@mui/icons-material";
import {
  Box,
  Button,
  Fab,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { usePageUpdate } from "../../data/actions/page-update";
import { usePage, useTracker } from "../../data/hooks";
import { TPageItem } from "../../types";
import { primaryGradient } from "../../utils/gradient";
import { reorderArray } from "../../utils/reorder-array";
import { Layout } from "../base/Layout";
import { useConfirmDialog } from "../modals/ConfirmDialog";
import { usePageItemAdd } from "../modals/PageItemAdd";
import { useTrackerEdit } from "../modals/TrackerEdit";
import { usePageDelete } from "../../data/actions/page-delete";

type TParams = {
  pageId: string;
};

export const PageEdit: React.FC = () => {
  const { pageId } = useParams<TParams>();
  const page = usePage(pageId);
  const trackerEdit = useTrackerEdit();
  const pageDelete = usePageDelete();
  const confirmDialog = useConfirmDialog();
  const pageItemAdd = usePageItemAdd();
  const pageUpdate = usePageUpdate();
  const [title, setTitle] = React.useState(page?.title || "");
  React.useEffect(() => {
    setTitle(page?.title || "");
  }, [page?.title]);

  // item menu
  const [menuElItem, setMenuElItem] = React.useState<undefined | HTMLElement>();
  const [menuItemItem, setMenuItemItem] = React.useState<
    undefined | TPageItem
  >();
  const closeMenuItem = () => setMenuElItem(undefined);

  const menuItemIndex = React.useMemo(() => {
    return page?.items.findIndex((d) => d._id === menuItemItem?._id) || 0;
  }, [menuItemItem, page]);

  if (!page) return null;

  return (
    <Layout title="Edit Page" back={`/pages`}>
      <Box sx={{ p: 2 }}>
        <TextField
          fullWidth
          label="Title"
          value={title}
          onChange={(e) => {
            setTitle(e.currentTarget.value.slice(0, 100));
          }}
          onBlur={() => {
            pageUpdate({ ...page, title });
          }}
        />
      </Box>
      <Typography
        sx={{
          fontSize: 12,
          p: 1,
          fontWeight: "bold",
          textAlign: "center",
          backgroundColor: "rgba(0,0,0,0.05)",
          borderTop: `1px solid rgba(224, 224, 224, 1);`,
          borderBottom: `1px solid rgba(224, 224, 224, 1);`,
        }}
      >
        Trackers
      </Typography>
      {page.items.length ? (
        page.items.map((item, i) => {
          return (
            <Stack
              key={item._id}
              direction="row"
              alignItems="center"
              sx={{ borderBottom: `1px solid rgba(224, 224, 224, 1);` }}
            >
              <PageEditItem item={item} />
              <Box sx={{ p: 1 }}>
                <IconButton
                  size="small"
                  aria-label="actions"
                  onClick={(e) => {
                    setMenuElItem(e.currentTarget);
                    setMenuItemItem(item);
                  }}
                >
                  <MoreVert fontSize="small" />
                </IconButton>
              </Box>
            </Stack>
          );
        })
      ) : (
        <Typography align="center" sx={{ p: 2 }}>
          No items yet, add a new one below
        </Typography>
      )}
      <Box sx={{ p: 2, mt: 4 }}>
        <Button
          fullWidth
          variant="outlined"
          size="small"
          sx={{ mb: 2 }}
          component={Link}
          to={`/entry/${page._id}`}
        >
          Enter inputs
        </Button>
        <Button
          fullWidth
          variant="outlined"
          size="small"
          color="error"
          onClick={() => {
            confirmDialog.open({
              title: "Confirm delete page",
              description:
                "Are you sure you want to delete this page. This will not delete your trackers, you can add them to a different page later.",
              onConfirm: () => {
                pageDelete(page);
              },
            });
          }}
        >
          Delete page
        </Button>
      </Box>
      <Menu anchorEl={menuElItem} open={!!menuElItem} onClose={closeMenuItem}>
        {menuItemIndex > 0 ? (
          <MenuItem
            onClick={() => {
              pageUpdate({
                ...page,
                items: reorderArray(
                  page.items,
                  menuItemIndex,
                  menuItemIndex - 1
                ),
              });
            }}
          >
            Move Up
          </MenuItem>
        ) : null}
        {menuItemIndex < page.items.length - 1 ? (
          <MenuItem
            onClick={() => {
              pageUpdate({
                ...page,
                items: reorderArray(
                  page.items,
                  menuItemIndex,
                  menuItemIndex + 1
                ),
              });
            }}
          >
            Move Down
          </MenuItem>
        ) : null}
        {menuItemItem?.type === "tracker" ? (
          <>
            <MenuItem
              component={Link}
              to={`/tracker/${menuItemItem?._id || ""}`}
            >
              Go To Tracker
            </MenuItem>
            <MenuItem
              onClick={() => {
                closeMenuItem();
                trackerEdit.open({ trackerId: menuItemItem?._id || "" });
              }}
            >
              Edit Tracker
            </MenuItem>
          </>
        ) : null}
        <MenuItem
          onClick={() => {
            closeMenuItem();
            confirmDialog.open({
              title: "Confirm remove item",
              description:
                "Are you sure you want to remove this item. This will not delete any trackers, you can add them to a different page later.",
              onConfirm: () => {
                const newItems = [...page.items];
                newItems.splice(menuItemIndex, 1);
                pageUpdate({ ...page, items: newItems });
              },
            });
          }}
        >
          Remove Tracker
        </MenuItem>
      </Menu>
      <Fab
        color="primary"
        sx={{
          position: "fixed",
          bottom: 14,
          right: 14,
          background: primaryGradient,
        }}
        onClick={() => {
          pageItemAdd.open({ page });
        }}
        aria-label="add tracker to page"
      >
        <Add />
      </Fab>
      {pageItemAdd.component}
      {trackerEdit.component}
      {confirmDialog.component}
    </Layout>
  );
};

const PageEditItem: React.FC<{ item: TPageItem }> = ({ item }) => {
  const tracker = useTracker(item._id);
  if (item.type === "tracker") {
    if (!tracker) return null;
    return (
      <Typography
        sx={{
          p: 1,
          pl: 3,
          flex: 1,
        }}
      >
        {tracker.title}
      </Typography>
    );
  }
  return null;
};
