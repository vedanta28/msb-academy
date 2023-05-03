import { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { UserContext } from "../context/UserContext";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

export default function LessonAdder({ CourseID }) {
  const { user } = useContext(UserContext);

  const [videoName, setVideoName] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [videoDuration, setVideoDuration] = useState(0);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios
      .post(`http://localhost:42690/api/courses/${CourseID}`, { videoName, videoLink, videoDuration }, {
        headers: { Authorization: `Bearer ${user.token}` }
      })
      .then((res) => {
        setVideoLink("");
        setVideoDuration("");
        setVideoName("");
        toast.success("Video Added Successfully")
      })
      .catch((err) => {
        toast.error("Failure to add video");
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
            name="vName"
            value={videoName}
            onChange={(e => setVideoName( () => e.target.value))}
            autoFocus
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="vlink"
            label="Video Link"
            name="vlink"
            value={videoLink}
            onChange={(e => setVideoLink( () => e.target.value))}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="vDuration"
            type="number"
            label="Video Duration"
            name="vDuration"
            value={videoDuration}
            onChange={(e => setVideoDuration( () => e.target.value))}
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