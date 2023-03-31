import "../stylesheets/Course.css";
import CourseDetails from "../components/CourseDetails";
import VideoCard from "../components/VideoCard";
import LessonAdder from "../components/LessonAdder";


const data = {
  Picture: "./koustav.png",
  Language: "English",
  InstuctorName: "Koustav Sen",
  CourseName: "Complete Course on Computer Networks - Part I",
  Description:
    "In this course, Koustav Sen will cover Computer Networks. All the important topics will be discussed in detail and would be helpful for aspirants preparing for the GATE exam.",
  TotalVideos: "10",
  StartDate: "21 Apr 2021",
  EndDate: "7 May 2021",
  TotalVideoLengh: "2h 30m",
  Price: "₹500",
};

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
  return (
    <div className="Course">
      <div className="DetailsContainer">{CourseDetails(data)}</div>

      <div className="VideoContainer">
        <div>
          {video.map((v) => (
            <VideoCard key={v.VideoSerial} Data={v} />
          ))}
        </div>
        <div>
            <LessonAdder/>
        </div>
      </div>
    </div>
  );
}
export default Course;
