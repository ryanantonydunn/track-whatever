import {
  Box,
  Button,
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { usePages } from "../../data/hooks";
import { Layout } from "../base/Layout";
import { usePageAdd } from "../modals/PageAdd";

export const PageList: React.FC = () => {
  const navigate = useNavigate();
  const pageAdd = usePageAdd();
  const pages = usePages();

  return (
    <Layout title="Track Whatever">
      <Container maxWidth="sm">
        <Paper>
          <List>
            {pages.length ? (
              pages.map((page) => {
                return (
                  <ListItem key={page.id} disablePadding>
                    <ListItemButton component={Link} to={`/page/${page.id}`}>
                      <ListItemText primary={page.title} />
                    </ListItemButton>
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
            component={Link}
            to="/edit-pages"
            sx={{ mr: 2 }}
          >
            Edit Pages
          </Button>
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
      </Container>
      {pageAdd.component}
    </Layout>
  );
};
