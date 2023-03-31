import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function LessonAdder() {
  const [value, setValue] = React.useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
    });
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        backgroundColor: "white",
        borderRadius: "5px",
        height: "500px",
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
          Add Lesson
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 4 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="ctitle"
            label="Course Title"
            name="ctitle"
            autoFocus
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="duration"
            label="Duration"
            name="duration"
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="vlink"
            label="Video Link"
            name="vlink"
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Date of Launch"
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

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, height: "50px" }}
          >
            Add Lesson
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
