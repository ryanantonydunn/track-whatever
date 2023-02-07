import { Add, MoreVert } from "@mui/icons-material";
import {
  Box,
  Fab,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useConfigUpdate } from "../../data/actions/config-update";
import { usePageDelete } from "../../data/actions/page-delete";
import { usePages } from "../../data/hooks";
import { useStore } from "../../data/provider";
import { TPage } from "../../types";
import { primaryGradient } from "../../utils/gradient";
import { reorderArray } from "../../utils/reorder-array";
import { Layout } from "../base/Layout";
import { useConfirmDialog } from "../modals/ConfirmDialog";
import { usePageAdd } from "../modals/PageAdd";

export const PageList: React.FC = () => {
  const pages = usePages();
  const confirmDialog = useConfirmDialog();
  const navigate = useNavigate();
  const pageAdd = usePageAdd();
  const pageDelete = usePageDelete();

  const { state } = useStore();
  const configUpdate = useConfigUpdate();

  // page menu
  const [menuElPage, setMenuElPage] = React.useState<undefined | HTMLElement>();
  const [menuItemPage, setMenuItemPage] = React.useState<undefined | TPage>();
  const closeMenuPage = () => setMenuElPage(undefined);

  const menuItemIndex = React.useMemo(() => {
    return pages.findIndex((d) => d._id === menuItemPage?._id);
  }, [menuItemPage, pages]);

  return (
    <Layout title="Manage Pages" back="/">
      <Box sx={{ pt: 1 }} />
      {pages.length ? (
        pages.map((page, i) => {
          return (
            <Stack
              key={page._id}
              direction="row"
              alignItems="center"
              sx={{ borderBottom: `1px solid rgba(224, 224, 224, 1);` }}
            >
              <Typography
                component={Link}
                to={`/page/${page._id}`}
                sx={{
                  p: 1,
                  pl: 3,
                  flex: 1,
                  color: "black",
                  textDecoration: "none",
                }}
              >
                {page.title}
              </Typography>
              <Box sx={{ p: 1 }}>
                <IconButton
                  size="small"
                  aria-label="actions"
                  onClick={(e) => {
                    setMenuElPage(e.currentTarget);
                    setMenuItemPage(page);
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
          No pages yet, add a new one below
        </Typography>
      )}
      <Menu anchorEl={menuElPage} open={!!menuElPage} onClose={closeMenuPage}>
        {menuItemIndex > 0 ? (
          <MenuItem
            onClick={() => {
              configUpdate({
                pageOrder: reorderArray(
                  state.config.pageOrder,
                  menuItemIndex,
                  menuItemIndex - 1
                ),
              });
            }}
          >
            Move Up
          </MenuItem>
        ) : null}
        {menuItemIndex < pages.length - 1 ? (
          <MenuItem
            onClick={() => {
              configUpdate({
                pageOrder: reorderArray(
                  state.config.pageOrder,
                  menuItemIndex,
                  menuItemIndex + 1
                ),
              });
            }}
          >
            Move Down
          </MenuItem>
        ) : null}
        <MenuItem component={Link} to={`/page/${menuItemPage?._id}`}>
          Edit Page
        </MenuItem>
        <MenuItem
          onClick={() => {
            closeMenuPage();
            confirmDialog.open({
              title: "Confirm delete page",
              description:
                "Are you sure you want to delete this page. This will not delete your trackers, you can add them to a different page later.",
              onConfirm: () => {
                if (menuItemPage) pageDelete(menuItemPage);
              },
            });
          }}
        >
          Delete Page
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
          pageAdd.open({
            onSave: (newPage) => {
              navigate(`/page/${newPage._id}`);
            },
          });
        }}
        aria-label="add new tracker"
      >
        <Add />
      </Fab>
      {pageAdd.component}
      {confirmDialog.component}
    </Layout>
  );
};
