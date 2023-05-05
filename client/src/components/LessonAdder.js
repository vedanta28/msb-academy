import { Button, TextField, Box, Typography, Container } from "@mui/material";
import { useState, useContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";

// Importing Context
import { UserContext } from "../context/UserContext";
import { ReloaderContext } from "../context/Reloader";

export default function LessonAdder({ CourseID }) {

  const { user } = useContext(UserContext);
  const { dispatch } = useContext(ReloaderContext);
  const [formData, setFormData] = useState({ videoName: "", videoLink: "", videoDuration: 0 });

  const handleChange = (e) => {
    setFormData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { videoName, videoLink, videoDuration } = formData;

    if (videoName === "" || videoLink === "" || videoDuration === "") {
      toast.error("Please fill all the fields");
      return;
    }

    await axios
      .post(`http://localhost:42690/api/courses/${CourseID}`,
        { videoName, videoLink, videoDuration }, {
          headers: { Authorization: `Bearer ${user.token}` }
        })
      .then(() => {
        setFormData({ videoName: "", videoLink: "", videoDuration: 0 });
        dispatch({ type: "RELOAD" });
        toast.success("Video Added Successfully")
      })
      .catch(() => {
        toast.error("Failure to add video");
      });
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "460px",
        borderRadius: "5px",
        paddingBottom: "20px",
        mb: 10,
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
        <Typography fontFamily="Open Sans" component="h1" variant="h5">
          Add Lesson
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 4 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="videoName"
            label="Course Title"
            value={formData && formData.videoName ? formData.videoName : ""}
            onChange={handleChange}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="videoLink"
            label="Video Link"
            value={formData && formData.videoLink ? formData.videoLink : ""}
            onChange={handleChange}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="videoDuration"
            type="number"
            value={formData && formData.videoDuration ? formData.videoDuration : ""}
            label="Video Duration"
            onChange={handleChange}
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