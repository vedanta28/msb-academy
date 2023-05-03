import "../stylesheets/Course.css";
import CourseDetails from "../components/CourseDetails";
import VideoCard from "../components/VideoCard";
import LessonAdder from "../components/LessonAdder";
import { useLocation } from 'react-router-dom';
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { toast } from "react-toastify";
import axios from "axios";

const video = [
  {
    VideoName: "Introduction to Computer Networks",
    VideoSerial: "1",
    VideoDate: "21 APR 2021",
    VideoLength: "30m",
  },
  {
    VideoName: "Introduction to Computer Networks",
    VideoSerial: "2",
    VideoDate: "23 APR 2021",
    VideoLength: "30m",
  },
  {
    VideoName: "Introduction to Computer Networks",
    VideoSerial: "3",
    VideoDate: "25 APR 2021",
    VideoLength: "30m",
  },
  {
    VideoName: "Introduction to Computer Networks",
    VideoSerial: "4",
    VideoDate: "27 APR 2021",
    VideoLength: "30m",
  },
  {
    VideoName: "Introduction to Computer Networks",
    VideoSerial: "5",
    VideoDate: "29 APR 2021",
    VideoLength: "30m",
  },
  {
    VideoName: "Introduction to Computer Networks",
    VideoSerial: "6",
    VideoDate: "01 MAY 2021",
    VideoLength: "30m",
  },
  {
    VideoName: "Introduction to Computer Networks",
    VideoSerial: "7",
    VideoDate: "02 MAY 2021",
    VideoLength: "30m",
  },
  {
    VideoName: "Introduction to Computer Networks",
    VideoSerial: "8",
    VideoDate: "03 MAY 2021",
    VideoLength: "30m",
  },
  {
    VideoName: "Introduction to Computer Networks",
    VideoSerial: "9",
    VideoDate: "05 MAY 2021",
    VideoLength: "30m",
  },
  {
    VideoName: "Introduction to Computer Networks",
    VideoSerial: "10",
    VideoDate: "07 MAY 2021",
    VideoLength: "30m",
  },
];

function Course() {

  let { pathname } = useLocation();
  const { user } = useContext(UserContext);
  const courseID = pathname.split('/')[2];
  const [values, setValues] = useState({});
  let userID;

  useEffect(() => {
    
    if (user && user.image)
      userID = user.image.split('.')[0];

    axios.get(`http://localhost:42690/api/courses/${courseID}`,
      { headers: { "Authorization": `Bearer ${user.token}` } }).then((res) => {
        const val = res.data.course;
        setValues((prevState) => ({ ...prevState, ...val }));

      }).catch((err) => {
        toast.error("Failed to Load Course");
      })
  }, []);

  let instructor = values.instructorID === userID;
  const data = {...values, videos: null};

  return (
    <div className="Course">
      <div className="DetailsContainer">
        < CourseDetails Data={data} CourseID={courseID} Instructor={instructor} />
      </div>

      <div className="VideoContainer">
        <div>
          {video.map((v) => (
            <VideoCard key={v.VideoSerial} Data={v} />
          ))}
        </div>
        {instructor &&
          <div>
            <LessonAdder />
          </div>
        }
      </div>
    </div>
  );
}

export default Course;