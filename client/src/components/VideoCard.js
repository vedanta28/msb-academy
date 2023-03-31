import { Stack, Typography, Card, CardContent, colors } from "@mui/material";

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
  let day = dateArray[0];
  let month = dateArray[1];
  return (
    <Card
      sx={{
        backgroundColor: "white",
        borderRadius: "7px",
        height: "90px",
        width: "752px",
        marginBottom: 1,
        marginLeft: "auto",
        marginRight: "auto"
      }}
    >
      <CardContent style={{ padding: "none" }}>
        <Stack spacing={5} direction="row">
          <Stack spacing={0.5}>
            <Typography
              variant="h1"
              style={{
                maxWidth: "327px",
                fontFamily: "Kanit, sans-serif",
                fontSize: "18px",
                marginLeft: "auto",
                marginRight: "auto"
              }}
            >
              {month}
            </Typography>
            <Typography
              variant="button"
              style={{
                maxWidth: "327px",
                fontFamily: "Kanit, sans-serif",
                fontSize: "24px",
                marginLeft: "auto",
                marginRight: "auto"
              }}
            >{day}</Typography>
          </Stack>
          <Stack spacing={2.5}>
            <Typography
              variant="h3"
              color="#3A4853"
              style={{ maxWidth: "640px", fontFamily: "Kanit, sans-serif", fontSize: "18px"}}
            >
              {Data.VideoName}
            </Typography>
            <Typography
              component="p"
              color="#7B8A95"
              style={{ maxWidth: "640px", fontFamily: "Kanit, sans-serif", fontSize: "14px"}}
            >
              Lesson {Data.VideoSerial} &nbsp; - &nbsp; {day} {month} &nbsp; - &nbsp; {Data.VideoLength}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default VideoCard;
