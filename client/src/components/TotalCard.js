import { Button, Typography, Card, CardContent, CardActions,} from "@mui/material";
import PaymentsIcon from "@mui/icons-material/Payments";
import { toast } from "react-toastify";
import { useContext } from "react";
import axios from "axios";

// Importing context
import { UserContext } from "../context/UserContext";
import { ReloaderContext } from "../context/Reloader";

function TotalCard({ Data, val, fn }) {

  const Total = Data.reduce((acc, curr) => acc + curr.fees, 0);
  const { user } = useContext(UserContext);
  const { dispatch } = useContext(ReloaderContext);

  const handlePayment = async () => {
    
    const courses = [];
    Data.forEach(e => {
      courses.push(e._id);
    });

    // Create An Order
    const { data } = await axios.post("http://localhost:42690/api/payments/order",
      { courses },
      { headers: { "Authorization": `Bearer ${user.token}` } });

    // Failed To Generate Order  
    if (!data) {
      toast.error("Failed to Process Payment");
      return;
    }

    // Get the Order Response
    const res = data.response;

    // Generate the Options For Payment Portal
    const options = {
      key: "rzp_test_MrTc2mD19J95OQ",
      amount: res.amount,
      currency: res.currency,
      order_id: res.id,
      name: "MSB Academy",
      image: "/msb.svg",
      handler: async (response) => {
        try {
          await axios.post("http://localhost:42690/api/payments/verify", { response }, { headers: { "Authorization": `Bearer ${user.token}` } });
          toast.success("Payment Successful");
          dispatch({ type: "RELOAD" });
        } catch (err) {
          toast.error("Transaction Failed");
        }
      }
    };

    // Open Payment Portal
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  }

  return (
    <Card
      sx={{
        minWidth: 100,
        minHeight: 100,
        boxShadow: "5px 5px 10px 1px rgba(0,0,0,0.1)",
      }}
    >
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
          onClick={handlePayment}
        >
          Proceed to Pay
        </Button>
      </CardActions>

    </Card>
  );
}

export default TotalCard;