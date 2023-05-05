import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Importing toastify
import { toast } from 'react-toastify';

//  Importing material-ui components 
import {
  Button, TextField, Box, Typography, Container, MenuItem, FormControl, InputLabel,
  OutlinedInput, InputAdornment, IconButton, Checkbox, FormControlLabel
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

// Importing contexts
import { UserContext } from "../context/UserContext";

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

  const [formData, setFormData] = useState({
    fname: "", lname: "", state: "", country: "", phoneNo: "", emailId: "", password: "", confirmPassword: ""
  });

  const [role, setRole] = useState("Student");
  const [dob, setDob] = useState(null);
  const navigate = useNavigate();

  // Handle Change
  const handleChange = (event) => {
    setFormData((prevState) => ({ ...prevState, [event.target.name]: event.target.value }));
  };

  // Handle Submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    const { fname, lname, state, country, phoneNo, emailId, password, confirmPassword } = formData;

    if (fname === "" || lname === "" || state === "" || country === "" ||
      phoneNo === "" || emailId === "" || role === "" || dob === "" || password === "") {
      toast.error("Please fill all the fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      toast.error("Passwords should be atleast 8 characters long");
      return;
    }

    dispatch({ type: "LOGIN_START" });
    try {
      const { data } = await axios.post("http://localhost:42690/api/users/signup", {
        fname, lname, state, country, phoneNo, emailId, role, dob, password
      });

      dispatch({ type: "LOGIN_SUCCESS", payload: { token: data.token, image: data.image } });
      navigate("/");
    }

    catch ({ response }) {
      dispatch({ type: "LOGIN_FAILURE" });
      if (response.data.includes("is not a valid 10-digit phone number"))
        toast.error("Please enter a valid phone number");
      else if (response.data.includes("is not a valid email"))
        toast.error("Please enter a valid email");
      else if (response.status === 500)
        toast.error("User already exists. Please login");
    }
  };

  // Toggle password visibility
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
        height: "1100px",
        marginTop: "40px",
        borderRadius: "5px",
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
        }}
      >

        {/* Heading */}
        <Typography fontFamily="Open Sans" component="h1" variant="h5">
          Sign Up
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 4 }}>

          {/* First Name */}
          <TextField
            name="fname"
            required
            fullWidth
            autoFocus
            margin="normal"
            label="First Name"
            onChange={handleChange}
          />

          {/* Last Name */}
          <TextField
            name="lname"
            required
            fullWidth
            margin="normal"
            label="Last Name"
            onChange={handleChange}
          />

          {/* Date of Birth */}
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

          {/* Phone */}
          <TextField
            name="phoneNo"
            required
            fullWidth
            label="Phone"
            margin="normal"
            onChange={handleChange}
          />

          {/* Email */}
          <TextField
            name="emailId"
            required
            fullWidth
            type="email"
            margin="normal"
            label="Email Address"
            onChange={handleChange}
          />

          {/* Role */}
          <TextField
            name="role"
            id="outlined-select-role"
            required
            fullWidth
            select
            label="Join as"
            defaultValue="Student"
            onChange={e => setRole(e.target.value)}
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

          {/* Country */}
          <TextField
            name="country"
            required
            fullWidth
            margin="normal"
            label="Country"
            onChange={handleChange}
          />

          {/* State */}
          <TextField
            name="state"
            required
            fullWidth
            label="State"
            margin="normal"
            onChange={handleChange}
          />

          {/* Password */}
          <FormControl sx={{ mt: 2 }} variant="outlined" fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              name="password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
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

          {/* Confirm Password */}
          <FormControl sx={{ mt: 3 }} variant="outlined" fullWidth>
            <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
            <OutlinedInput
              name="confirmPassword"
              type={showPassword ? "text" : "password"}
              sx={{ width: "100%" }}
              endAdornment={
                <InputAdornment position="end">
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
              onChange={handleChange}
            />
          </FormControl>

          {/* CheckBox */}
          <FormControlLabel
            sx={{ mt: 2 }}
            control={<Checkbox />}
            label="I agree to the terms and conditions"
          />

          {/* Submit Button */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isFetching}
            sx={{ mt: 3, mb: 2, height: "50px" }}
            onClick={handleSubmit}
          >
            Sign Up
          </Button>

        </Box>
      </Box>
    </Container>
  );
}
