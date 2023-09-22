import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import axios from "axios";

// Importing material-ui components
import { Button, TextField, Box, Typography, Container, FormControl, InputLabel, OutlinedInput, IconButton, InputAdornment } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

// Importing contexts
import { UserContext } from "../context/UserContext";
import { ReloaderContext } from "../context/Reloader";

export default function SignInForm() {
  const { dispatch, isFetching } = useContext(UserContext);
  const [formData, setFormData] = useState({ emailId: "", password: "" });
  const navigate = useNavigate();
  const reloader = useContext(ReloaderContext);

  // Handle Change
  const handleChange = (event) => {
    setFormData((prevState) => ({ ...prevState, [event.target.name]: event.target.value }));
  };

  // Handle Submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    const { emailId, password } = formData;
    if (emailId === "" || password === "") {
      toast.error("Please fill all the fields");
      return;
    }

    dispatch({ type: "LOGIN_START" });

    try {
      const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/users/signin`, {
        emailId, password,
      });

      dispatch({ type: "LOGIN_SUCCESS", payload: { token: data.token, image: data.image } });
      reloader.dispatch({ type: "RELOAD" });
      toast.success("Welcome");
      navigate("/");
    }

    catch (error) {
      dispatch({ type: "LOGIN_FAILURE" });
      if (error.response.status === 403)
        toast.error("Invalid Credentials");
    }
  };

  // TOGGLE PASSWORD VISIBILITY
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (e) => e.preventDefault();

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "370px",
        marginTop: "40px",
        borderRadius: "5px",
        marginBottom: "124px",
        paddingBottom: "20px",
        backgroundColor: "white",
        boxShadow: "5px 5px 10px 1px rgba(0,0,0,0.1)",
      }}
    >

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >

        {/* Heading */}
        <Typography fontFamily="Open Sans" component="h1" variant="h5">
          Sign In
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 4 }}>

          {/* EMAIL ID */}
          <TextField
            name="emailId"
            margin="normal"
            required
            fullWidth
            label="Email Address"
            autoFocus
            onChange={handleChange}
          />

          {/* PASSWORD */}
          <FormControl sx={{ mt: 1 }} variant="outlined" required fullWidth>

            <InputLabel htmlFor="password">
              Password
            </InputLabel>

            <OutlinedInput
              name="password"
              type={showPassword ? "text" : "password"}
              sx={{ width: "100%" }}
              endAdornment={
                <InputAdornment position="end" >
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
              onChange={handleChange}
            />
          </FormControl>

          {/* SIGN IN BUTTON */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isFetching}
            sx={{ mt: 3, mb: 2, height: "50px" }}
          >
            Sign In
          </Button>

        </Box>
      </Box>
    </Container>
  );
}