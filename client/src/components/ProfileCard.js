import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";

import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";

import LocationOnIcon from "@mui/icons-material/LocationOn";

const userDetails = {
  image: "/koustav.png",
  city: "Kolkata",
  country: "India",
  jobTitle: "Student",
  company: "IIT Bhubaneswar",
  name: "Koustav Sen",
  email: "20cs01072@iitbbs.ac.in",
  timezone: "GMT+5:30",
};

export default function ProfileCard() {
  const { user } = useContext(UserContext);
  
  return (
    <Card className="ProfileCard">
      <CardContent>

        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Avatar
            src="/default.jpg"
            sx={{
              height: 80,
              mb: 2,
              width: 80,
              border: "1px solid black",
              backgroundSize: "contain",
            }}
          />

          <Typography gutterBottom variant="h5">
            {userDetails.name}
          </Typography>

          <Box sx={{ display: "flex", margin: "5px" }}>
            <Typography color="text.secondary" variant="body2">
              {userDetails.jobTitle}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", margin: "5px" }}>
            <Typography color="text.secondary" variant="body2">
              {userDetails.email}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", margin: "5px" }}>
            <LocationOnIcon fontSize="small" />
            <Typography color="text.secondary" variant="body2">
              {userDetails.city}, {userDetails.country}
            </Typography>
          </Box>
        </Box>
      </CardContent>
      <hr
        style={{ width: "90%", borderTop: "0.2px solid rgba(230,230,230)" }}
      />

      <CardActions sx={{display: "flex", justifyContent: "space-evenly" }}>

        {/* Upload Images  */}
        <Button
          sx={{
            backgroundColor: "white",
            marginTop: "5px",
            ":hover": {
              backgroundColor: "white",
            },
          }}
          disableTouchRipple
        // onClick={handleSubmit}
        >
          Upload Images
        </Button>
        <input type="file" id="fileInput" style={{ display: "none" }} />
      </CardActions>
    </Card>
  );
}
