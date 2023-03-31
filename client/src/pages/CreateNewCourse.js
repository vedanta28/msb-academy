import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

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

  return (
    <Box sx={{ paddingTop: "100px", backgroundColor: "#EEEFF2", paddingBottom: "50px" }}>
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          backgroundColor: "white",
          marginTop: "40px",
          borderRadius: "5px",
          height: "750px",
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
            Create New Course
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 4 }}
          >
            <TextField
              disabled
              id="outlined-disabled"
              margin="normal"
              required
              fullWidth
              label="Instructor Name"
              name="name"
              defaultValue="Koustav Sen"
              autoFocus
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Start Date"
                inputFormat="DD/MM/YYYY"
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
              id="cname"
              label="Course Name"
              name="cname"
              autoFocus
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="cname"
              label="Course Language"
              name="cname"
              autoFocus
            />

            <TextField
              margin="normal"
              required
              fullWidth
              height="100px"
              id="cname"
              label="Course Description"
              name="cname"
              autoFocus
            />

            <TextField
              margin="normal"
              required
              fullWidth
              height="100px"
              id="cname"
              label="Price"
              name="cname"
              autoFocus
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, height: "50px" }}
            >
              Add New Course
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}