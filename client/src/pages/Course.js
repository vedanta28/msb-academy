import { useState, useContext, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { toast } from "react-toastify";
import axios from "axios";

// Importing contexts
import { UserContext } from "../context/UserContext";
import { ReloaderContext } from "../context/Reloader";

// Importing stylesheets
import "../stylesheets/Course.css";

// Importing components
import CourseDetails from "../components/CourseDetails";
import VideoCard from "../components/VideoCard";
import LessonAdder from "../components/LessonAdder";

function Course() {

  const { user } = useContext(UserContext);
  const { reload } = useContext(ReloaderContext);

  let { pathname } = useLocation();
  const courseID = pathname.split('/')[2];
  
  const [values, setValues] = useState({});
  const [videos, setVideos] = useState([]);
  const [purchase, setPurchase] = useState(false);
  const [rating, setRating] = useState(0);
  
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/courses/${courseID}`,
      { headers: { "Authorization": `Bearer ${user.token}` } })
      .then(({ data }) => {
        setValues((prevState) => ({ ...prevState, ...data.course, videos: null }));
        setVideos(() => (data.course.videos));
      })
      .catch(() => {
        toast.error("Failed to Load Course");
      })

    axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/users/my-course`,
      { courseID }, { headers: { "Authorization": `Bearer ${user.token}` } })
      .then(({data}) => {
        setPurchase(() => data.bought);
        setRating(() => data.rating);
      })
      .catch(() => {
        toast.info("Something Went Wrong");
      })
  }, [reload]);

  const bought = (user.image.split('.')[0] === values.instructorID) || purchase;

  return (
    <div className="Course">
      <div className="DetailsContainer">
        < CourseDetails Data={values} CourseID={courseID} Bought={{ bought, rating }} />
      </div>

      <div className="VideoContainer">

        {bought &&
          <div>
            {videos.map((v) => (
              <VideoCard key={v._id} Data={v} />
            ))}
          </div>
        }
        {user.image.split('.')[0] === values.instructorID &&
          <div>
            <LessonAdder CourseID={courseID} />
          </div>
        }
      </div>
    </div>
  );
}

export default Course;