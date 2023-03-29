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
  jobTitle: "Senior Mern Stack Developer | ML Enthusiast",
  company: "IIT Bhubaneswar",
  name: "Koustav Sen",
  timezone: "GMT+5:30",
};

export const AccountProfile = () => (
  <Card>
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
          }}
        />
        <Typography gutterBottom variant="h5">
          {user.name}
        </Typography>
        <Box sx={{display: 'flex', margin:'5px', flexWrap:"wrap"}}>
        <Typography color="text.secondary" variant="body2" noWrap="false">
          {user.jobTitle}
        </Typography>
        </Box>


        <Box sx={{display: 'flex', margin:'5px'}}>
        <LocationOnIcon fontSize="small" />
        <Typography color="text.secondary" variant="body2">
        {user.city}, {user.country}
        </Typography>
        </Box>

        <Box sx={{display: 'flex', margin:'5px'}}>
        <SchoolIcon fontSize="small" sx={{mr:1}}/>
        <Typography color="text.secondary" variant="body2" >
          {user.company}
        </Typography>
        </Box>

      </Box>
    </CardContent>
    <Divider />
    <CardActions>
      <Button fullWidth variant="text">
        Upload picture
      </Button>
    </CardActions>
  </Card>
);
