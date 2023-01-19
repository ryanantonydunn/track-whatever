import { ArrowBack, Menu as MenuIcon } from "@mui/icons-material";
import {
  AppBar,
  Backdrop,
  Box,
  CircularProgress,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";
import { useStore } from "../../data/provider";

type TLayout = {
  children: React.ReactNode;
  title: string;
  back?: string;
};

export const Layout: React.FC<TLayout> = ({ children, title, back }) => {
  const [menuEl, setMenuEl] = React.useState<null | HTMLElement>(null);
  const closeMenu = () => setMenuEl(null);
  const isMenuOpen = !!menuEl;
  const { state } = useStore();

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="md">
          <Toolbar>
            {back && (
              <IconButton
                size="large"
                edge="start"
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
              aria-controls={isMenuOpen ? "menu" : undefined}
              aria-haspopup="true"
              aria-expanded={isMenuOpen ? "true" : undefined}
              aria-label="Menu"
              onClick={(e) => {
                setMenuEl(e.currentTarget);
              }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu"
              anchorEl={menuEl}
              open={isMenuOpen}
              onClose={closeMenu}
              MenuListProps={{
                "aria-labelledby": "menu-button",
              }}
            >
              <MenuItem onClick={closeMenu} component={Link} to="/">
                View Pages
              </MenuItem>
              <MenuItem onClick={closeMenu} component={Link} to="/trackers">
                View All Trackers
              </MenuItem>
              <MenuItem onClick={closeMenu} component={Link} to="/compare">
                Compare Data
              </MenuItem>
              <MenuItem
                onClick={closeMenu}
                component={Link}
                to="/import-export"
              >
                Import/Export Data
              </MenuItem>
            </Menu>
          </Toolbar>
        </Container>
      </AppBar>
      <Box
        component="main"
        sx={{
          p: 2,
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        {state.loading ? null : children}
      </Box>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={state.loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};
