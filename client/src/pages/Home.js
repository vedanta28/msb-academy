import { Box, Button } from "@mui/material";
import "../stylesheets/Home.css";
import { useNavigate } from "react-router-dom";

function Home() {

  const navigate = useNavigate();

  return (
    
    <div className="Home">
      <Box className="HomeDesktop">

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
    </div>
  );
}

export default Home;
