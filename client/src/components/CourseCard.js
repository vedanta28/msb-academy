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
  import YouTubeIcon from '@mui/icons-material/YouTube';
  import AccessTimeIcon from '@mui/icons-material/AccessTime';

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
//   };

  function CourseCard(Data) {
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
              <CardMedia
                component="img"
                image={Data.Picture}
                alt={Data.CourseName}
                style={{
                  borderRadius: "10px",
                  height: "183px",
                  width: "326px",
                  marginRight: "30px",
                  verticalAlign: "middle",
                }}
              />
            </Stack>
            <Stack spacing={3}>
              <Stack spacing={5} direction="row">
                <Stack>
                  <Typography
                    component="div"
                    variant="button"
                    style={{ maxWidth: "400px", marginBottom: "10px" }}
                  >
                    {Data.Language}
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
                    {Data.CourseName}
                  </Typography>
                  <Typography
                    component="div"
                    variant="h4"
                    style={{
                      maxWidth: "400px",
                      marginBottom: "10px",
                      fontFamily: "Kanit, sans-serif",
                      fontSize: "18px",
                      color: "#3C4852",
                    }}
                  >
                    {Data.InstuctorName}
                  </Typography>
                  <Typography
                    component="div"
                    variant="paragraph"
                    style={{ maxWidth: "400px", marginBottom: "10px" }}
                  >
                    {Data.Description}
                  </Typography>
                </Stack>
                <Stack spacing={1} sx={{ margin: "auto" }}>
                  <Button
                    variant="contained"
                    style={{
                      color: "white",
                      backgroundColor: "#0ABD80",
                      height: "48px",
                      width: "176px",
                      marginTop: "auto"
                    }}
                  >
                    Get Subcription
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<ShareIcon />}
                    style={{
                      color: "black",
                      backgroundColor: "white",
                      height: "48px",
                      width: "176px",
                      marginBottom: "auto"
                    }}
                  >
                    Share
                  </Button>
                </Stack>
              </Stack>
              <Stack direction="row">
                <CalendarMonthIcon fontSize="large" color="disabled"/>
                <Typography variant="caption" maxWidth="80px" marginRight={10}>
                  {Data.StartDate} - {Data.EndDate}
                </Typography>
                <YouTubeIcon fontSize="large" color="disabled"/>
                <Typography variant="caption" maxWidth="60px" marginRight={10}>
                  {Data.TotalVideos} lessons
                </Typography>
                <AccessTimeIcon fontSize="large" color="disabled"/>
                <Typography variant="caption" maxWidth="60px" marginLeft="4px" marginTop="auto" marginBottom="auto">
                {Data.TotalVideoLengh}
                </Typography>
              </Stack>
            </Stack>
          </Container>
        </CardContent>
      </Card>
    );
  }

  export default CourseCard;