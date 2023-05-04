import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {UserContext} from "../context/UserContext";
import axios from "axios";

// importing toastify
import { toast } from 'react-toastify';

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import MenuItem from "@mui/material/MenuItem";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

const roles = [
  {
    value: "Student",
    label: "Student",
  },
  {
    value: "Instructor",
    label: "Instructor",
  },
];

export default function SignUpForm() {
  const { dispatch, isFetching } = useContext(UserContext);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [emailId, setEmailId] = useState("");
  const [dob, setDob] = useState(null);
  const [role, setRole] = useState("Student");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  // HANDLE SUBMIT
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (fname === "" || lname === "" || state === "" || country === "" || phoneNo === "" || emailId === "" || role === "" || dob === "" || password === "") {
      toast.error("Please fill all the fields");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    dispatch({ type: "LOGIN_START" });
    try {
      const {data} = await axios.post("http://localhost:42690/api/users/signup", {
        fname, lname, state, country, phoneNo, emailId, role, dob, password
      });

      let userData = {token: data.token, image: data.image};
      dispatch({ type: "LOGIN_SUCCESS", payload: userData });
      navigate("/");
    } 
    catch (error) {
      dispatch({ type: "LOGIN_FAILURE" });
      if (error.response.data.includes("is not a valid 10-digit phone number"))
        toast.error("Please enter a valid phone number");
      else if (error.response.data.includes("is not a valid email"))
        toast.error("Please enter a valid email");
      else if (error.response.status === 500)
        toast.error("User already exists. Please login");
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
        borderRadius: "5px",
        height: "1100px",
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
        }}
      >
        <Typography fontFamily="Open Sans" component="h1" variant="h5">
          Sign Up
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 4 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="fname"
            label="First Name"
            name="fname"
            autoFocus
            onChange={(e) => setFname(e.target.value)}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="lname"
            label="Last Name"
            name="lname"
            autoFocus
            onChange={(e) => setLname(e.target.value)}
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Date of Birth"
              value={dob}
              sx={{
                mt: 1.5,
                mb: 1,
                width: "100%",
              }}
              required
              onChange={(newValue) => {
                setDob(newValue);
              }}
              slotProps={{
                textField: {
                  helperText: "MM / DD / YYYY",
                },
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>

          <TextField
            margin="normal"
            required
            fullWidth
            id="phone"
            label="Phone"
            name="phone"
            autoFocus
            onChange={(e) => setPhoneNo(e.target.value)}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="email"
            label="Email Address"
            type="email"
            id="email"
            autoComplete="email"
            onChange={(e) => setEmailId(e.target.value)}
          />

          <TextField
            id="outlined-select-role"
            required
            fullWidth
            select
            label="Join as"
            defaultValue="Student"
            onChange={(e) => {setRole(e.target.value)} }
            sx={{
              mt: 2.5,
            }}
          >
            {roles.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            margin="normal"
            required
            fullWidth
            name="country"
            label="Country"
            id="country"
            onChange={(e) => setCountry(e.target.value)}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="state"
            label="State"
            id="state"
            onChange={(e) => setState(e.target.value)}
          />

          {/* <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          /> */}

          <FormControl sx={{ mt: 2 }} variant="outlined" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              fullWidth
              id="password"
              type={showPassword ? "text" : "password"}
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
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>

          <FormControl sx={{ mt: 3 }} variant="outlined" required fullWidth>
            <InputLabel htmlFor="confirm-password">Confirm Password</InputLabel>
            <OutlinedInput
              fullWidth
              id="confirm-password"
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
              label="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </FormControl>
          <FormControlLabel
            sx={{ mt: 2 }}
            control={<Checkbox />}
            label="I agree to the terms and conditions"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isFetching}
            sx={{ mt: 3, mb: 2, height: "50px" }}
          >
            Sign Up
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
