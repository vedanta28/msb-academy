import "../stylesheets/CheckOut.css";
import { Typography } from "@mui/material";
import CheckoutCard from "../components/CheckoutCard";

const course = true;

function Courses({data, text}) {
  return (
    <div className="CheckOut Courses">
      <div className="Heading">
        <Typography variant="h4" sx={{ fontFamily: "Open Sans" }}>
          {text}
        </Typography>
      </div>
      <div className="CheckOutBox">
        <div>
          {data.map((d) => (
            <CheckoutCard key={d._id} Data={d} Type={course} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Courses;