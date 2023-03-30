import {
  CardMedia,
  Container,
  Stack,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import Rating from "@mui/material/Rating";

//   const data = {
//     Picture: "./koustav.png",
//     Language: "English",
//     InstuctorName: "Koustav Sen",
//     CourseName: "Complete Course on Computer Networks - Part I",
//   };

function CourseCard(Data) {
  return (
    <Card
      sx={{
        backgroundColor: "white",
        borderRadius: "7px",
        height: "210px",
        width: "1050px",
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
          <Stack spacing={1}>
            <Typography
              component="div"
              variant="h1"
              style={{
                maxWidth: "auto",
                fontFamily: "Kanit, sans-serif",
                fontSize: "20px",
              }}
            >
              {Data.CourseName}
            </Typography>
            <Typography
              component="div"
              variant="caption"
              style={{
                maxWidth: "auto",
                fontFamily: "Kanit, sans-serif",
                fontSize: "16px",
                color: "#3C4852",
              }}
            >
              {Data.InstuctorName}
            </Typography>
            <Typography
              component="div"
              variant="paragraph"
              style={{ maxWidth: "auto", marginBottom: "10px" }}
            >
              {Data.Description}
            </Typography>
            <Rating
              name="half-rating"
              defaultValue={2.5}
              precision={0.5}
              sx={{ marginBottom: "auto" }}
            />
            <Typography
              component="div"
              variant="h4"
              style={{
                maxWidth: "400px",
                fontFamily: "Kanit, sans-serif",
                fontSize: "16px",
                color: "#3C4852",
              }}
            >
              {Data.Price}
            </Typography>
          </Stack>
        </Container>
      </CardContent>
    </Card>
  );
}

export default CourseCard;
