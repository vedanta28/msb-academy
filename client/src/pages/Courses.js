import "../stylesheets/Courses.css";
import { Typography } from "@mui/material";
import TotalCard from "../components/TotalCard";
import CoursesCard from "../components/CourseCard";
import SearchBar from "../components/SearchBar";

function Courses({ data, text, checkout }) {
  return (
    <div className="Courses">
      <div className="Heading">
        <Typography variant="h4" sx={{ fontFamily: "Open Sans" }}>
          {text}
        </Typography>
        <SearchBar/>
      </div>
      <div className="CoursesBox">
        <div>
          {data.map((d) => (
            <CoursesCard key={d._id} Data={d} Checkout={checkout} />
          ))}
        </div>
        {checkout && <div>{TotalCard(data)}</div>}
      </div>
    </div>
  );
}

export default Courses;