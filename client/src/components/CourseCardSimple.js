import {
  Avatar,
  Chip,
  CardMedia,
  Container,
  Stack,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import Rating from "@mui/material/Rating";

function CourseCardSimple(Data) {
  return (
    <Card elevation={0}>
      <CardContent className="CourseCardSimple">
        <Container style={{ display: "flex", padding: "none" }}>
          <Stack>
            <CardMedia
              component="img"
              image={Data.Picture}
              alt={Data.CourseName}
              style={{
                borderRadius: "3px",
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
            <Stack direction="row" spacing={1}>
              <Chip
                avatar={<Avatar alt="Natacha" src={Data.InstructorImage} />}
                label={Data.InstructorName}
                variant="filled"
              />
            </Stack>
            <Typography
              component="div"
              variant="caption"
              style={{
                maxWidth: "auto",
                fontFamily: "Kanit, sans-serif",
                fontSize: "14px",
                color: "#3C4852",
              }}
            >
              {Data.Description}
            </Typography>
            <Rating
              name="half-rating-read"
              defaultValue={Data.Rating}
              precision={0.5}
              readOnly
            />
            <Typography
              component="div"
              variant="h4"
              style={{
                maxWidth: "400px",
                fontFamily: "Kanit, sans-serif",
                fontSize: "20px",
                color: "#3C4852",
              }}
            >
              ₹ {Data.Price}
            </Typography>
          </Stack>
        </Container>
      </CardContent>
    </Card>
  );
}

export default CourseCardSimple;
