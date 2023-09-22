import { useState, useContext, useEffect } from "react";
import { Typography } from "@mui/material";
import { toast } from "react-toastify";
import axios from "axios";

// importing context
import { UserContext } from "../context/UserContext";

// importing stylesheets
import "../stylesheets/Courses.css";

// importing components
import CoursesCard from "../components/CourseCard";
import SearchBar from "../components/SearchBar";

function Classroom() {

  const { user } = useContext(UserContext);
  const [reqCourses, setReqCourses] = useState([]);

  useEffect(() => {
    // route for classroom courses 
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/users/classroom`,
      { headers: { "Authorization": `Bearer ${user.token}` } })
      .then(({ data }) => {
        setReqCourses(() => data.classroom);
      })
      .catch(() => {
        toast.error("Failed to Load My Courses");
      });
  }, []);

  return (
    <div className="Courses">
      <div className="Heading">
        <Typography variant="h4" sx={{ fontFamily: "Open Sans" }}>
          My Courses
        </Typography>
        <SearchBar />
      </div>
      <div className="CoursesBox">
        <div>
          {reqCourses.map((d) => (
            <CoursesCard key={d._id} Data={d.course} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Classroom;