import { TextField, Box, Typography, Container, Button } from "@mui/material";
import { useState, useContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";

// import context
import { UserContext } from "../context/UserContext";

export default function NewCourseForm() {

  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", description: "", fees: "" });
 
  const handleChange = (e) => {
    setFormData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    const { name, description, fees } = formData;
    if (name === "" || description === "" || fees === "") {
      toast.error("Please fill all the fields");
      return;
    }

    axios
      .post("http://localhost:42690/api/courses/", { name, description, fees }, {
        headers: { Authorization: `Bearer ${user.token}` }
      })
      .then(() => {
        toast.success("Course Created");
        setFormData({ name: "", description: "", fees: "" });
        setLoading(false);
      })
      .catch((err) => {
        if(err.response.status === 403)
        toast.error("Only Instructors can Upload Course");
        else  
        toast.info("Something Went Wrong");
        setLoading(false);
      });
      
  };

  return (
    <Box
      sx={{
        paddingTop: "100px",
        backgroundColor: "#EEEFF2",
        paddingBottom: "50px",
      }}
    >
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "500px",
          marginTop: "40px",
          borderRadius: "5px",
          paddingTop: "10px",
          paddingBottom: "10px",
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
            Create New Course
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 4 }}
          >
      
          {/* Course Name */}
            <TextField
              margin="normal"
              name="name"
              required
              fullWidth
              autoFocus
              label="Course Name"
              value={(formData && formData.name) ? formData.name : ""}
              onChange={handleChange}
            />

            {/* Course Description */}
            <TextField
              margin="normal"
              name="description"
              required
              fullWidth
              value={(formData && formData.description) ? formData.description : ""}
              label="Course Description"
              onChange={handleChange}
            />

            {/* Course Price */}
            <TextField
              margin="normal"
              name="fees"
              required
              fullWidth
              label="Price"
              type="number"
              value={(formData && formData.fees) ? formData.fees : ""}
              onChange={handleChange}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              onSubmit={handleSubmit}
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
