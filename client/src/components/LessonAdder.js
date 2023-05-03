import { useState } from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";


export default function LessonAdder() {
  const [value, setValue] = useState(null);

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
        height: "460px",
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
            id="vlink"
            label="Video Link"
            name="vlink"
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="vDuration"
            type="number"
            label="Video Duration"
            name="vDuration"
          />

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
