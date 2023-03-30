import * as React from "react";
import Button from "@mui/material/Button";

const Home = () => {
  return (
    <div className="Base" style={{height:"1000vh"}}>
      <div className="Home">
        <div className="HomeText">
          <h1
            style={{
              fontFamily: "Kanit, sans-serif",
              fontSize: "48px",
            }}
          >
            Crack your goal with India's top educators
          </h1>
          <h5
            style={{
              fontFamily: "Kanit, sans-serif",
              fontSize: "16px",
              margin: "5px",
            }}
          >
            Over <span style={{ color: "#0ABC81" }}>8,00,000+</span> learners
            trust us for their preparation
          </h5>
          <Button variant="contained">Start Learning</Button>
        </div>
        <div className="HomeImage" />
      </div>
      <div className="Home">
        <div className="HomeText">
          <h1
            style={{
              fontFamily: "Kanit, sans-serif",
              fontSize: "48px",
            }}
          >
            Crack your goal with India's top educators
          </h1>
          <h5
            style={{
              fontFamily: "Kanit, sans-serif",
              fontSize: "16px",
              margin: "5px",
            }}
          >
            Over <span style={{ color: "#0ABC81" }}>8,00,000+</span> learners
            trust us for their preparation
          </h5>
          <Button variant="contained">Start Learning</Button>
        </div>
        <div className="HomeImage" />
      </div>
    </div>
  );
};
export default Home;
