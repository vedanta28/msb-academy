import CourseCard from "../components/CourseCard";
const data = {
  Picture: "./koustav.png",
  Language: "English",
  InstuctorName: "Koustav Sen",
  CourseName: "Complete Course on Computer Networks - Part I",
  Description:
    "In this course, Koustav will cover Computer Networks. All the important topics will be discussed in detail and would be helpful for aspirants preparing for the GATE exam.",
  TotalVideos: "10",
  StartDate: "21 Apr, 2021",
  EndDate: "7 May, 2021",
  TotalVideoLengh: "2h 30m",
};

const Page = () => (
  <div className="Course">
    <div style={{ margin: "auto" }}>{CourseCard(data)}</div>
  </div>
);

Page.getLayout = (page) => <div>{page}</div>;

export default Page;
