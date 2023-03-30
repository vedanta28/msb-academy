import {
  CardMedia,
  Button,
  Box,
  Container,
  Stack,
  Typography,
  Card,
  CardContent,
  CardActions,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import PaymentsIcon from "@mui/icons-material/Payments";

const Data = [
  {
    Picture: "./koustav.png",
    Name: "Koustav Sen",
    Price: 100,
    Description: "This Course will teach you life",
  },
  {
    Picture: "./koustav.png",
    Name: "Cute Girl ",
    Price: 100,
    Description: "This Course will give you wife",
  },
  {
    Picture: "./koustav.png",
    Name: "Koustav Sen",
    Price: 400,
    Description: "This Course will take your life",
  },
  {
    Picture: "./koustav.png",
    Name: "Koustav Sen",
    Price: 100,
    Description: "This Course will teach you life",
  },
];

function TotalCard(Data) {
  const Total = Data.reduce((acc, curr) => acc + curr.Price, 0);
  return (
    <Card sx={{ maxWidth: 600 }}>
      <CardContent sx={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="body2">Your Total is ₹{Total}</Typography>
      </CardContent>

      <CardActions>
        <Button
          variant="Text"
          startIcon={<PaymentsIcon />}
          style={{ verticalAlign: "middle", color: "green" }}
        >
          Proceed to Pay
        </Button>
      </CardActions>
    </Card>
  );
}
function MediaCard(Data) {
  return (
    <Card sx={{ minWidth: 600 }}>
      <CardContent sx={{ display: "flex", flexDirection: "column" }}>
        <Container style={{ display: "flex", padding: "10px" }}>
          <CardMedia
            component="img"
            image={Data.Picture}
            alt={Data.Name}
            style={{
              height: "100px",
              width: "200px",
              marginRight: "20px",
              verticalAlign: "middle",
            }}
          />
          <Typography
            component="div"
            variant="button"
            noWrap="true"
            style={{ verticalAlign: "middle" }}
          >
            {Data.Name}
          </Typography>
        </Container>

        <Typography variant="body2">{Data.Description}</Typography>
      </CardContent>

      <CardActions>
        <Button
          startIcon={<DeleteIcon />}
          style={{ verticalAlign: "middle", color: "red" }}
        >
          Remove from Cart
        </Button>
        <Typography
          variant="body2"
          style={{ verticalAlign: "middle", marginRight: "50" }}
        >
          ₹{Data.Price}
        </Typography>
      </CardActions>
    </Card>
  );
}

const Page = () => (
  <div className="Base">
    <title>Checkout</title>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <Card>{Data.map(MediaCard)}</Card>
          {TotalCard(Data)}
        </Stack>
      </Container>
    </Box>
  </div>
);

Page.getLayout = (page) => <div>{page}</div>;

export default Page;
