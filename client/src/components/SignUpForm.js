import * as React from "react";
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
  const [value, setValue] = React.useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };
  const [showPassword, setShowPassword] = React.useState(false);

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
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="lname"
            label="Last Name"
            name="lname"
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Date of Birth"
              value={value}
              sx={{
                mt: 1.5,
                mb: 1,
                width: "100%",
              }}
              required
              onChange={(newValue) => {
                setValue(newValue);
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
          />

          <TextField
            id="outlined-select-currency"
            required
            fullWidth
            select
            label="Join as"
            defaultValue="Student"
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
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="state"
            label="State"
            id="state"
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
            sx={{ mt: 3, mb: 2, height: "50px" }}
          >
            Sign Up
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
