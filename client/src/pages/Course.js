import "../stylesheets/Course.css";
import CourseDetails from "../components/CourseDetails";
import VideoCard from "../components/VideoCard";
import LessonAdder from "../components/LessonAdder";
import { useLocation } from 'react-router-dom';
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { toast } from "react-toastify";
import axios from "axios";

function Course() {

  let { pathname } = useLocation();
  const { user } = useContext(UserContext);
  const courseID = pathname.split('/')[2];
  const [values, setValues] = useState({});
  const [videos, setVideos] = useState([]);
  const [purchase, setPurchase] = useState(false);
  const [rating, setRating] = useState(0);
  let userID;

  useEffect(() => {

    if (user && user.image)
      userID = user.image.split('.')[0];

    axios.get(`http://localhost:42690/api/courses/${courseID}`,
      { headers: { "Authorization": `Bearer ${user.token}` } }).then((res) => {
        const val = res.data.course;
        const myVideos = val.videos;
        setValues((prevState) => ({ ...prevState, ...val }));
        setVideos((prevState) => ([...prevState, ...myVideos]));
      }).catch((err) => {
        toast.error("Failed to Load Course");
      })

    axios.post(`http://localhost:42690/api/users/myCourse`,
      { courseID }, { headers: { "Authorization": `Bearer ${user.token}` } })
      .then((res) => {
        setPurchase( () => res.data.bought );
        setRating( () => res.data.rating );
      }).catch((err) => {
        console.log(err);
      })
  }, []);

  const data = { ...values, videos: null };
  const bought = user.image.split('.')[0] === values.instructorID || purchase;
  return (
    <div className="Course">
      <div className="DetailsContainer">
        < CourseDetails Data={data} CourseID={courseID} Bought={{bought, rating}} />
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
            <LessonAdder CourseID={courseID}/>
          </div>
        }
      </div>
    </div>
  );
}

export default Course;