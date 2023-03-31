import {
  CardMedia,
  Button,
  Container,
  Stack,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import YouTubeIcon from "@mui/icons-material/YouTube";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

//   const data = {
//     Picture: "./koustav.png",
//     Language: "English",
//     InstuctorName: "Koustav Sen",
//     CourseName: "Complete Course on Computer Networks - Part I",
//     Description:
//       "In this course, Koustav will cover Computer Networks. All the important topics will be discussed in detail and would be helpful for aspirants preparing for the GATE exam.",
//     TotalVideos: "10",
//     StartDate: "21 Apr, 2021",
//     EndDate: "7 May, 2021",
//     TotalVideoLengh: "2h 30m",
//     Price: "₹500"
//   };

function VideoCard(Data) {
  const dateArray = Data.VideoDate.split(" ");
  const day = dateArray[0];
  const month = dateArray[1];
  return (
    <Card
      sx={{
        backgroundColor: "white",
        borderRadius: "7px",
        height: "370px",
        width: "1040px",
        marginBottom: 1,
      }}
    >
      <CardContent style={{ padding: "none" }}>
        <Container style={{ display: "flex", padding: "none" }}>
          <Stack>
            <Typography>{day}</Typography>
            <Typography>{month}</Typography>
          </Stack>
          <Stack>
            <Typography
              component="div"
              variant="button"
              style={{ maxWidth: "400px", marginBottom: "10px" }}
            >
              {Data.VideoName}
            </Typography>
            <Typography
              component="div"
              variant="h1"
              style={{
                maxWidth: "327px",
                marginBottom: "20px",
                fontFamily: "Kanit, sans-serif",
                fontSize: "24px",
              }}
            >
              Lesson {Data.CourseSeriel} . {day} {month} . {Data.VideoLength}
            </Typography>
          </Stack>
        </Container>
      </CardContent>
    </Card>
  );
}

export default VideoCard;
