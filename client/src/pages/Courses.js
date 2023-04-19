import { useContext, useState, useEffect } from "react";
import { CoursesContext } from "../context/CoursesContext";

import { Typography } from "@mui/material";
import "../stylesheets/Courses.css";

import CoursesCard from "../components/CourseCard";
import SearchBar from "../components/SearchBar";

function Courses() {
  const { courses } = useContext(CoursesContext);
  const [reqCourses, setReqCourses] = useState([]);

  useEffect(() => {
    setReqCourses(courses);
  }, [])
  
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