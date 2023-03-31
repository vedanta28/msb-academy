import "../stylesheets/CheckOut.css"

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
    Description: "lorem ipsum dolor sit amet consectetur adipiscing elit ut aliquam purus sit amet luctus venenatis lectus magna fringilla urna porttitor rhoncus dolor purus non enim praesent elementum facilisis leo vel fringilla est ullamcorper eget nulla facilisi etiam dignissim diam quis"
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
    <Card sx={{ minWidth: 600, minHeight: 400 }}>
      <CardContent sx={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="body2">Your Total is ₹{Total}</Typography>
      </CardContent>

      <CardActions>
      <Container style={{ display: "flex" }}>
          <Button
            startIcon={<DeleteIcon />}
            style={{ marginTop: "auto", marginRight: "auto", color: "orange" }}
          >
            Back To Browsing
          </Button>
        <Button
          variant="Text"
          startIcon={<PaymentsIcon />}
          style={{ verticalAlign: "middle", color: "green" }}
        >
          Proceed to Pay
        </Button>
          
        </Container>
      </CardActions>
      
    </Card>
  );
}
function MediaCard(Data) {
  return (
    <Card 
    sx={{ backgroundColor:"lightpink" ,borderRadius:"20px",minWidth: 600, marginBottom: 1 }}>
      <CardContent style={{ padding: "none" }}>
        <Container style={{ display: "flex", padding: "none" }}>
          <Stack>
            <CardMedia
              component="img"
              image={Data.Picture}
              alt={Data.Name}
              style={{
                borderRadius: "10px",
                height: "100px",
                width: "200px",
                marginRight: "0px",
                verticalAlign: "middle",
              }}
            />
            <Typography variant="button"

              sx={{ marginTop: "5px", marginBottom: "5px", marginLeft: "auto", marginRight: "auto" }}        >
              {Data.Name}
            </Typography>
          </Stack>
          <Stack 
            sx={{margin:"auto"}}
          >
            <Typography
              component="div"
              variant="paragraph"
              style={{ maxWidth: "400px",height:"100px", padding: "5px"}}
            >
              {Data.Description}
            </Typography>
            <Typography
            variant="button"
            style={{ margin: "auto" }}
          >
            Price: ₹{Data.Price}
          </Typography>
          </Stack>
        </Container>


      </CardContent>

      <CardActions>
        <Container style={{ display: "flex" }}>
          <Button
            startIcon={<DeleteIcon />}
            style={{ marginTop: "auto", marginLeft: "auto", color: "red" }}
          >
            Remove
          </Button>
          
        </Container>
      </CardActions>
    </Card>
  );
}

const Page = () => (
  <div className="Checkout">
    <div>
      {Data.map(MediaCard)}
    </div>
    <div className="TotalCard" >
      {TotalCard(Data)}
    </div>
  </div>
);

Page.getLayout = (page) => <div>{page}</div>;

export default Page;
