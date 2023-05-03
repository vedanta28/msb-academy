import * as React from "react";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { toast } from "react-toastify";

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

export default function NewCourseForm() {
  const { user } = useContext(UserContext);
  const { dispatch, isFetching } = useContext(UserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const navigate = useNavigate();
  const [value, setValue] = React.useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Hi:" + name + " " + description + " " + price);
    if (name === "" || description === "" || price === "") {
      toast.error("Please fill all the fields");
      return;
    }
    axios
      .post("http://localhost:42690/api/courses/", { name, description, price}, {
        headers: { Authorization: `Bearer ${user.token}` }
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failure to create Courses");
      });
    // useEffect(() => {
    //   // route for classroom courses
    //   axios.get("http://localhost:42690/api/users/classroom",
    //     { headers: { "Authorization": `Bearer ${user.token}` } })
    //     .then((res) => {
    //       console.log(res.data.classroom);
    //       setReqCourses(res.data.classroom);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //       toast.error("Failure to Load My Courses");
    //     });
    // }, []);
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
              defaultValue={`${user.name}`}
              // autoFocus
            />

            {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
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
                // autoFocus
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
            </LocalizationProvider> */}

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

            {/* <TextField
              margin="normal"
              required
              fullWidth
              id="lang"
              label="Course Language"
              name="lang"
              // autoFocus
            /> */}

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
