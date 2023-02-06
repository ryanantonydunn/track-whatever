import { ArrowBack, Menu as MenuIcon } from "@mui/icons-material";
import {
  Backdrop,
  Box,
  CircularProgress,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { useStore } from "../../data/provider";
import { primaryGradient } from "../../utils/gradient";

type TLayout = {
  children: React.ReactNode;
  title: string;
  back?: string;
};

const menu = [
  {
    text: "Home",
    to: "/",
  },
  {
    text: "Compare Data",
    to: "/compare",
  },
  {
    text: "Manage Trackers",
    to: "/trackers",
  },
  {
    text: "Manage Pages",
    to: "/pages",
  },
  {
    text: "Import/Export Data",
    to: "/import-export",
  },
];

export const Layout: React.FC<TLayout> = ({ children, title, back }) => {
  const { state } = useStore();
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <Box sx={{ pb: 8 }}>
      <Box
        sx={{
          background: primaryGradient,
          boxShadow: `inset 0 -1px 0 rgba(0,0,0,.3)`,
          color: "white",
          p: 1,
          pl: 2,
        }}
      >
        <Stack direction="row" alignItems="center">
          {back && (
            <IconButton
              color="inherit"
              aria-label="back"
              sx={{ mr: 2 }}
              component={Link}
              to={back}
            >
              <ArrowBack />
            </IconButton>
          )}
          <Typography variant="h6" component="h1" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <IconButton
            id="menu-button"
            color="inherit"
            aria-controls={menuOpen ? "menu" : undefined}
            aria-haspopup="true"
            aria-expanded={menuOpen ? "true" : undefined}
            aria-label="menu"
            onClick={(e) => {
              setMenuOpen(!menuOpen);
            }}
          >
            <MenuIcon />
          </IconButton>
        </Stack>
      </Box>
      <Drawer anchor="right" open={menuOpen} onClose={() => setMenuOpen(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => setMenuOpen(false)}
          onKeyDown={() => setMenuOpen(false)}
        >
          <List>
            {menu.map((item, i) => (
              <ListItem key={i} disablePadding>
                <ListItemButton component={Link} to={item.to}>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      {state.loading ? null : children}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={state.loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};
