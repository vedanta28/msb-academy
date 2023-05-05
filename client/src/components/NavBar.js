import { Box, Typography, Container, Avatar, AppBar, Toolbar, IconButton, MenuItem, Menu, Button } from "@mui/material";
import { useState, useContext, useEffect } from "react";
import { ref, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import axios from "axios";

// Importing Firebase Settings
import storage from "../firebase";

// Importing contexts
import { UserContext } from "../context/UserContext";
import { ReloaderContext } from "../context/Reloader";

let settings = ["Profile", "CheckOut", "Log Out"];

function NavBar() {

  const [imageURL, setImageURL] = useState("/default.jpg");
  const [pages, setPages] = useState(["Courses", "Classroom"]);

  // Menu States
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

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

  const { dispatch, user } = useContext(UserContext);
  const { reload } = useContext(ReloaderContext);
  
  let navigate = useNavigate();

  const routeChange = async (path) => {
    handleCloseUserMenu();
    handleCloseNavMenu();
    if (path === "/log out") {
      try {
        const { status } = await axios.get(
          "http://localhost:42690/api/users/logout"
        );
        if (status === 200) {
          dispatch({ type: "LOGOUT" });
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      if (path === "/add new course") {
        path = "/new-course";
      }
      navigate(path);
    }
  };

  // For Image
  useEffect(() => {
    if (user) {

      getDownloadURL(ref(storage, `users/${user.image}`))
        .then((url) => {
          setImageURL(url);
        })
        .catch((err) => {
          setImageURL("/default.jpg");
        });

      axios.get("http://localhost:42690/api/users/user-details",
        { headers: { "Authorization": `Bearer ${user.token}` } })
        .then((res) => {
          if (res.data.fetchedUser.role === "Instructor") {
            setPages(["Courses", "Classroom", "Add New Course"]);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }

  }, [user, reload]);

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
              src="/msb.svg"
              alt=""
              style={{ width: "60px", marginRight: "10px" }}
            />
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="a"
            onClick={() => routeChange("/")}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "Open Sans",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "black",
              textDecoration: "none",
              marginRight: "30px",
              ":hover": {
                cursor: "pointer",
              },
            }}
          >
            MSB ACADEMY
          </Typography>

          {/* NAVIGATION */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => routeChange(`/${page.toLowerCase()}`)}
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
                <MenuItem
                  key={page}
                  onClick={() => routeChange(`/${page.toLowerCase()}`)}
                >
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
              alt="MSB"
              style={{ width: "60px", marginRight: "10px" }}
            />

            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                m: 2,
                fontWeight: 700,
                display: { xs: "flex", md: "none" },
                fontFamily: "Open Sans",
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
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, mr: 2 }}>
                <Avatar alt="User" src={imageURL} />
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
                    onClick={() => routeChange(`/${setting.toLowerCase()}`)}
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
                onClick={() => routeChange("/signin")}
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
