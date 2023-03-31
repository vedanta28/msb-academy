import CheckoutCard from "../components/CheckoutCard";
import TotalCard from "../components/TotalCard";
import "../stylesheets/CheckOut.css";

const data = [
  {
    Picture: "./sampleCourse.png",
    Language: "English",
    InstructorName: "Koustav Sen",
    InstructorImage: "./koustav.png",
    CourseName: "Complete Course on Computer Networks - Part I",
    Description:
      "In this course, Koustav will cover Computer Networks. All the important topics will be discussed in detail and would be helpful for aspirants preparing for the GATE exam.",
    TotalVideos: "10",
    StartDate: "21 Apr, 2021",
    EndDate: "7 May, 2021",
    TotalVideoLengh: "2h 30m",
    Price: 500
  },
  {
    Picture: "./sampleCourse.png",
    Language: "English",
    InstructorName: "Koustav Sen",
    InstructorImage: "./koustav.png",
    CourseName: "Complete Course on Computer Networks - Part II",
    Description:
      "In this course, Koustav will cover Computer Networks. All the important topics will be discussed in detail and would be helpful for aspirants preparing for the GATE exam.",
    TotalVideos: "10",
    StartDate: "21 Apr, 2021",
    EndDate: "7 May, 2021",
    TotalVideoLengh: "2h 30m",
    Price: 500
  },
  {
    Picture: "./sampleCourse.png",
    Language: "English",
    InstructorName: "Koustav Sen",
    InstructorImage: "./koustav.png",
    CourseName: "Complete Course on Computer Networks - Part III",
    Description:
      "In this course, Koustav will cover Computer Networks. All the important topics will be discussed in detail and would be helpful for aspirants preparing for the GATE exam.",
    TotalVideos: "10",
    StartDate: "21 Apr, 2021",
    EndDate: "7 May, 2021",
    TotalVideoLengh: "2h 30m",
    Price: 500
  },
  {
    Picture: "./sampleCourse.png",
    Language: "English",
    InstructorName: "Koustav Sen",
    InstructorImage: "./koustav.png",
    CourseName: "Complete Course on Computer Networks - Part IV",
    Description:
      "In this course, Koustav will cover Computer Networks. All the important topics will be discussed in detail and would be helpful for aspirants preparing for the GATE exam.",
    TotalVideos: "10",
    StartDate: "21 Apr, 2021",
    EndDate: "7 May, 2021",
    TotalVideoLengh: "2h 30m",
    Price: 500
  }
];

const Page = () => (
  <div className="CheckOut">
    <div>{data.map(CheckoutCard)}</div>
    <div>{TotalCard(data)}</div>
  </div>
);

Page.getLayout = (page) => <div>{page}</div>;

export default Page;
