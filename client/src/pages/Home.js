import * as React from "react";
import "../stylesheets/Home.css";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <div className="Home">
      <Box className="HomeDesktop" sx={{ display: { xs: "none", md: "flex" } }}>
        {/* TEXT */}
        <div className="HomeText">
          <h6 className="HomeText-1">One Stop Solution For</h6>
          <h6 className="HomeText-2">Computer Science</h6>
          <h6 className="HomeText-3">
            Be the
            <span style={{ color: "#0ABC81" }}>{" Most Significant Bit "}</span>
            in the Industry
          </h6>
          <Button
            variant="contained"
            sx={{ mt: 4, p: 1.5, width: "200px" }}
            onClick={() => navigate("/courses")}
          >
            Start Learning
          </Button>
        </div>

        {/* IMAGE */}
        <div className="HomeImageContainer">
          <div className="HomeImage" />
        </div>
      </Box>

      <Box className="HomeMobile" sx={{ display: { xs: "flex", md: "none" } }}>
        
        <div className="MobileImageContainer">
          <div className="MobileImage" />
        </div>

        <div className="Mobile HomeText">
          <h6 className="HomeText-4">One Stop Solution For</h6>
          <h6 className="HomeText-5">Computer Science</h6>
          <h6 className="HomeText-7">Be the</h6>
          <h6 className="HomeText-6">{" Most Significant Bit "}</h6>
          <h6 className="HomeText-7">in the Industry</h6>
          <Button
            variant="contained"
            sx={{ mt: 4, p: 1.5, width: "200px" }}
            onClick={() => navigate("/courses")}
          >
            Start Learning
          </Button>
        </div>

      </Box>
    </div>
  );
}

export default Home;
