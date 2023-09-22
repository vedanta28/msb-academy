import { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import { toast } from "react-toastify";
import axios from "axios";

// importing stylesheets
import "../stylesheets/Courses.css";

// importing components
import CoursesCard from "../components/CourseCard";
import SearchBar from "../components/SearchBar";

function Courses() {

  const [reqCourses, setReqCourses] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/courses`)
      .then(({ data }) => {
        setReqCourses(() => data.courses);
      })
      .catch(() => {
        toast.error("Failure to Load Courses");
      });
  }, []);

  return (
    <div className="Courses">
      <div className="Heading">
        <Typography variant="h4" sx={{ fontFamily: "Open Sans" }}>
          All Courses
        </Typography>
        <SearchBar />
      </div>
      <div className="CoursesBox">
        <div>
          {reqCourses.map((d) => (
            <CoursesCard key={d._id} Data={d} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Courses;