import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {UserContext} from "../context/UserContext";
import axios from "axios";

// importing toastify
import { toast } from 'react-toastify';

// importing material-ui components
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

export default function SignInForm() 
{
  const { dispatch, isFetching } = useContext(UserContext);
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // HANDLE SUBMIT
  const handleSubmit = async (event) => {
    event.preventDefault();

    if(emailId === "" || password === "")
    {
      toast.error("Please fill all the fields");
      return;
    }

    dispatch({ type: "LOGIN_START" });
    try {
      const {data} = await axios.post("http://localhost:42690/api/users/signin", {
        emailId, password, 
      });

      console.log(data);
      let userData = {token: data.token, image: data.image};
      dispatch({ type: "LOGIN_SUCCESS", payload: userData });
      navigate("/");
    } 
    catch (error) {
      dispatch({ type: "LOGIN_FAILURE" });
      console.log(error.response);
      if(error.response.status === 401)
        toast.error("Invalid Credentials");
    }
  };

  // TOGGLE PASSWORD VISIBILITY
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  
  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        backgroundColor: "white",
        marginTop: "40px",
        marginBottom: "124px",
        borderRadius: "5px",
        height: "370px",
        paddingBottom: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
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
        <Typography fontFamily="Open Sans" component="h1" variant="h5">
          Sign In
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 4}}>
          
          {/* EMAIL ID */}
          <TextField
            margin="normal"
            required
            fullWidth
            id="emailId"
            label="Email Address"
            name="emailId"
            autoComplete="email"
            autoFocus
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
          />

          {/* PASSWORD */}
          <FormControl sx={{ mt: 1 }} variant="outlined" required fullWidth>
            
            <InputLabel htmlFor="password">
              Password
            </InputLabel>
            
            <OutlinedInput
              fullWidth
              id="password"
              type={showPassword ? "text" : "password"}
              sx={{ width: "100%" }}
              endAdornment={
                <InputAdornment position="end" fullWidth>
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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