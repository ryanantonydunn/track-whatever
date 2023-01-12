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
import { Link } from "react-router-dom";
import { usePages } from "../../data/hooks";
import { Layout } from "../base/Layout";

export const PageList: React.FC = () => {
  const pages = usePages();

  return (
    <Layout title="Track Whatever">
      <Container maxWidth="md">
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
            to="/trackers"
            sx={{ mr: 2 }}
          >
            View All Trackers
          </Button>
          <Button
            variant="text"
            size="small"
            component={Link}
            to="/edit-pages"
            sx={{ mr: 2 }}
          >
            Edit Pages
          </Button>
        </Box>
      </Container>
    </Layout>
  );
};
