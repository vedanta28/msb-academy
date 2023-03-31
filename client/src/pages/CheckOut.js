import CheckoutCard from "../components/CheckoutCard";
import TotalCard from "../components/TotalCard";
import "../stylesheets/CheckOut.css";
import { Typography } from "@mui/material";

const data = [
  {
    _id: "1",
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
    Price: 500,
  },
  {
    _id: "2",
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
    Price: 500,
  },
  {
    _id: "3",
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
    Price: 500,
  },
  {
    _id: "4",
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
    Price: 500,
  },
];

function CheckOut() {
  return (
    <div className="CheckOut">
      <div className="Heading">
        <Typography variant="h4" sx={{ fontFamily: "Open Sans" }}>
          Check Out
        </Typography>
      </div>
      <div className="CheckOutBox">
        <div>
          {data.map((d) => (
            <CheckoutCard key={d._id} Data={d} />
          ))}
        </div>
        <div>{TotalCard(data)}</div>
      </div>
    </div>
  );
}

export default CheckOut;
