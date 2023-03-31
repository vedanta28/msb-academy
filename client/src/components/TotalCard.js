import {
  Button,
  Typography,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import React from "react";
import PaymentsIcon from "@mui/icons-material/Payments";

function TotalCard(Data) {
  const Total = Data.reduce((acc, curr) => acc + curr.Price, 0);
  return (
    <Card sx={{ minWidth: 100, minHeight: 100 }}>
      <CardContent sx={{ display: "flex", flexDirection: "column" }}>
        <Typography
          component="div"
          variant="h4"
          style={{
            maxWidth: "400px",
            fontFamily: "Kanit, sans-serif",
            fontSize: "20px",
            color: "#6B6F72",
            marginTop: "auto",
            marginBottom: "auto",
          }}
        >
          Total:
        </Typography>
        <Typography
          component="div"
          variant="h4"
          style={{
            maxWidth: "400px",
            fontFamily: "Kanit, sans-serif",
            fontSize: "32px",
            color: "#3C4852",
            marginTop: "auto",
            marginBottom: "auto",
          }}
        >
          ₹{Total}
        </Typography>
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

export default TotalCard;