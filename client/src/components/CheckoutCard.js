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
import DeleteIcon from "@mui/icons-material/Delete";

//   const data = {
//     Picture: "./koustav.png",
//     Language: "English",
//     InstuctorName: "Koustav Sen",
//     CourseName: "Complete Course on Computer Networks - Part I",
//   };

function CheckoutCard(Data) {
  const handleClick = () => {
    console.info("You clicked the Chip.");
  };

  const handleDelete = () => {
    console.info("You clicked the delete icon.");
  };
  return (
    <Card
      sx={{
        backgroundColor: "white",
        borderRadius: "7px",
        height: "215px",
        width: "1050px",
        marginBottom: "10px",
        marginLeft: "auto",
        marginRight: "auto",
      }}
      elevation={0}
    >
      <CardContent style={{ padding: "none" }}>
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
                // avatar={<Avatar alt="Natacha" src="./koustav.png" />}
                avatar={<Avatar alt="Natacha" src={Data.InstructorImage} />}
                label={Data.InstructorName}
                variant="filled"
              />
            </Stack>
            {/* <Typography
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
            </Typography> */}
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
              name="half-rating"
              defaultValue={2.5}
              precision={0.5}
              sx={{ marginBottom: "auto" }}
            />
            <Stack direction="row" spacing="auto">
              <Typography
                component="div"
                variant="h4"
                style={{
                  maxWidth: "400px",
                  fontFamily: "Kanit, sans-serif",
                  fontSize: "20px",
                  color: "#3C4852",
                  marginTop: "auto",
                  marginBottom: "auto"
                }}
              >
                {Data.Price}
              </Typography>
              <Chip
                label="Remove"
                onClick={handleClick}
                onDelete={handleDelete}
                deleteIcon={<DeleteIcon />}
                variant="outlined"
                color="error"
              />
            </Stack>
          </Stack>
        </Container>
      </CardContent>
    </Card>
  );
}

export default CheckoutCard;
