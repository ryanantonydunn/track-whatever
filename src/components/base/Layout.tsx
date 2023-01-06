import { ArrowBack, Menu as MenuIcon } from "@mui/icons-material";
import {
  AppBar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

type TLayout = {
  children: React.ReactNode;
  title: string;
  back?: boolean;
};

export const Layout: React.FC<TLayout> = ({ children, title, back = true }) => {
  const navigate = useNavigate();

  const [menuEl, setMenuEl] = React.useState<null | HTMLElement>(null);
  const closeMenu = () => setMenuEl(null);
  const isMenuOpen = !!menuEl;

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="sm">
          <Toolbar>
            {back && (
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="back"
                sx={{ mr: 2 }}
                onClick={() => navigate(-1)}
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
                Pages
              </MenuItem>
              <MenuItem onClick={closeMenu} component={Link} to="/trackers">
                Trackers
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
        {children}
      </Box>
    </>
  );
};
