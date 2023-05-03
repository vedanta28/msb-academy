import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";

import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { toast } from "react-toastify";

export default function NewCourseForm() {

  const { user } = useContext(UserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (name === "" || description === "" || price === "") {
      toast.error("Please fill all the fields");
      return;
    }
    axios
      .post("http://localhost:42690/api/courses/", { name, description, price, instructorName : user.name}, {
        headers: { Authorization: `Bearer ${user.token}` }
      })
      .then((res) => {
        toast.success("Course Created");
      })
      .catch((err) => {
        if(err.response.status === 403)
          toast.error("Only Instructors can Upload Course");
        else  
          toast.error("Something Went Wrong");
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
          backgroundColor: "white",
          marginTop: "40px",
          borderRadius: "5px",
          height: "550px",
          paddingTop: "10px",
          paddingBottom: "10px",
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
              defaultValue={`${user.name}`}
              // autoFocus
            />

      
            <TextField
              margin="normal"
              required
              fullWidth
              id="cname"
              label="Course Name"
              name="cname"
              autoFocus
              onChange={(e) => setName(e.target.value)}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              height="100px"
              id="desc"
              label="Course Description"
              name="desc"
              // autoFocus
              onChange={(e) => setDescription(e.target.value)}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              height="100px"
              id="price"
              label="Price"
              name="price"
              type="number"
              // autoFocus
              onChange={(e) => setPrice(e.target.value)}
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
