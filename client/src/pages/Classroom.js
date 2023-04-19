import { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";

import { Typography } from "@mui/material";
import { toast } from "react-toastify";
import "../stylesheets/Courses.css";

import CoursesCard from "../components/CourseCard";

function Classroom() {

  const { user } = useContext(UserContext);
  const [reqCourses, setReqCourses] = useState([]);

  useEffect(() => {
    // route for classroom courses 
    axios.get("http://localhost:42690/api/users/classroom",
      { headers: { "Authorization": `Bearer ${user.token}` } })
      .then((res) => {
        setReqCourses(res.data.courses);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failure to Load My Courses");
      });
  },[]);

  return (
    <div className="Courses">
      <div className="Heading">
        <Typography variant="h4" sx={{ fontFamily: "Open Sans" }}>
          My Courses
        </Typography>
      </div>
      <div className="CoursesBox">
        {
          reqCourses.length === 0 ? (
            <>No Courses Purchased Yet</>
          ) : (
            <div>
              {reqCourses.map((d) => (
                <CoursesCard key={d._id} Data={d} Checkout={true} />
              ))}
            </div>
          )
        }
      </div >
    </div>
  );
}

export default Classroom;