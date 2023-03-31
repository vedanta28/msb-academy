import CourseCard from "../components/CourseCard";
import VideoCard from "../components/VideoCard";
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
    VideoSerial: "1",
    VideoDate: "21 APR 2021",
    VideoLength: "30m",
  },
  {
    VideoName: "Introduction to Computer Networks",
    VideoSerial: "1",
    VideoDate: "21 APR 2021",
    VideoLength: "30m",
  },
  {
    VideoName: "Introduction to Computer Networks",
    VideoSerial: "1",
    VideoDate: "21 APR 2021",
    VideoLength: "30m",
  },
  {
    VideoName: "Introduction to Computer Networks",
    VideoSerial: "1",
    VideoDate: "21 APR 2021",
    VideoLength: "30m",
  },
  {
    VideoName: "Introduction to Computer Networks",
    VideoSerial: "1",
    VideoDate: "21 APR 2021",
    VideoLength: "30m",
  },
  {
    VideoName: "Introduction to Computer Networks",
    VideoSerial: "1",
    VideoDate: "21 APR 2021",
    VideoLength: "30m",
  },
  {
    VideoName: "Introduction to Computer Networks",
    VideoSerial: "1",
    VideoDate: "21 APR 2021",
    VideoLength: "30m",
  },
  {
    VideoName: "Introduction to Computer Networks",
    VideoSerial: "1",
    VideoDate: "21 APR 2021",
    VideoLength: "30m",
  },
  {
    VideoName: "Introduction to Computer Networks",
    VideoSerial: "1",
    VideoDate: "21 APR 2021",
    VideoLength: "30m",
  }
];

const Page = () => (
  <div className="Course">
    <div style={{ margin: "auto" }}>{CourseCard(data)}</div>
    <div style={{ marginRight: "auto"}}>{video.map(VideoCard)}</div>
  </div>
);

Page.getLayout = (page) => <div>{page}</div>;

export default Page;
