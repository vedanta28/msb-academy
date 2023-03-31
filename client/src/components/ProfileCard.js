import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import SchoolIcon from "@mui/icons-material/School";

const user = {
  avatar: "./koustav.png",
  city: "Kolkata",
  country: "India",
  jobTitle: "Student",
  company: "IIT Bhubaneswar",
  name: "Koustav Sen",
  email: "20cs01072@iitbbs.ac.in",
  timezone: "GMT+5:30",
};

export default function ProfileCard() {
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
          src={user.avatar}
          sx={{
            height: 80,
            mb: 2,
            width: 80,
            border: "1px solid black",
            backgroundSize: "contain"
          }}
        />
        <Typography gutterBottom variant="h5">
          {user.name}
        </Typography>


        <Box sx={{display: 'flex', margin:'5px'}}>
        <Typography color="text.secondary" variant="body2" >
          {user.jobTitle}
        </Typography>
        </Box>

        <Box sx={{display: 'flex', margin:'5px'}}>
        <Typography color="text.secondary" variant="body2" >
          {user.email}
        </Typography>
        </Box>

        <Box sx={{display: 'flex', margin:'5px'}}>
        <LocationOnIcon fontSize="small" />
        <Typography color="text.secondary" variant="body2">
        {user.city}, {user.country}
        </Typography>
        </Box>

        {/* <Box sx={{display: 'flex', margin:'5px'}}>
        <SchoolIcon fontSize="small" sx={{mr:1}}/>
        <Typography color="text.secondary" variant="body2" >
          {user.company}
        </Typography>
        </Box> */}

      </Box>
    </CardContent>
    <hr style={{width: "90%", borderTop: "0.2px solid rgba(230,230,230)"}} />
    <CardActions>
      <Button fullWidth sx={{
        backgroundColor: "white",
        marginTop: "5px",
        ":hover":{
          backgroundColor: "white"
        }
      }} disableTouchRipple>
        Upload picture
      </Button>
    </CardActions>
  </Card>
  )
};