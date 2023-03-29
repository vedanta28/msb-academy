import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";

// Menu Items
const pages = ["Courses", "Classroom"];

// User Settings
const settings = ["Profile", "CheckOut", "Log Out"];

// User
const user = false;

function NavBar() {

  let navigate = useNavigate();
  const routeChange = (path) => {
    if(path === "/log Out") 
    {
        user = false; // need to make an api call to log out
        navigate("/");
        return;
    }
    else{
      navigate(path);
    }
  }

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="sticky"
      sx={{ background: "transparent", color: "black", boxShadow: "none" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* ----------------------------------LARGE SCREEN START--------------------------------- */}
          {/* LOGO */}
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <img
              src="./msb.svg"
              alt=""
              style={{ width: "60px", marginRight: "10px" }}
            />
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "Open Sans",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "black",
              textDecoration: "none",
              marginRight: "30px",
            }}
          >
            MSB ACADEMY
          </Typography>

          {/* NAVIGATION */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                href={`${page.toLowerCase()}`}
                sx={{
                  my: 2,
                  color: "black",
                  display: "block",
                  padding: "10px",
                  marginLeft: "10px",
                  marginRight: "10px",
                  borderBottom: "2px solid transparent",
                  borderRadius: "0px",
                  ":hover": {
                    bgcolor: "transparent",
                    borderBottom: "2px solid black",
                  },
                }}
                disableTouchRipple
              >
                {page}
              </Button>
            ))}
          </Box>

          {/* ----------------------------------LARGE SCREEN END----------------------------------- */}
          {/* ---------------------------------SMALL SCREEN START---------------------------------- */}
          {/* NAVIGATION */}
          <Box sx={{ flexGrow: 0, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {/* NAVIGATION OPTIONS */}
              {pages.map((page) => (
                <MenuItem key={page} onClick={() => handleCloseNavMenu(page)}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* LOGO */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              justifyContent: "center",
            }}
          >
            <img
              src="./msb.svg"
              alt=""
              style={{ width: "60px", marginRight: "10px" }}
            />

            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                mt: 2,
                ml: 2,
                display: { xs: "flex", md: "none" },
                fontFamily: "Open Sans",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "black",
                textDecoration: "none",
              }}
            >
              MSB
            </Typography>
          </Box>

          {/* ----------------------------------SMALL SCREEN END----------------------------------- */}
          {/* ------------------------------------USER SETTINGS------------------------------------ */}
          {user ? (
            // User is logged in
            <Box sx={{ flexGrow: 0 }}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={() => {
                      {
                        handleCloseUserMenu();
                        routeChange(`/${setting.toLowerCase()}`);
                      }
                    }}
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            // User is not logged in
            <Box sx={{ flexGrow: 0 }}>
              <Button
                variant="outlined"
                href="/signin"
                sx={{
                  color: "black",
                  border: "none",
                  borderBottom: "2px solid transparent",
                  borderRadius: "0px",
                  ":hover": {
                    bgcolor: "transparent",
                    border: "none",
                    borderBottom: "2px solid black",
                  },
                }}
                disableTouchRipple
              >
                Sign In
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
