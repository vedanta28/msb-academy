import { Box, Button, Container, SvgIcon, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

function Error({ type }) {
  const navigate = useNavigate();
  let data = "";
  let photoLink = `/error-${type}.png`;

  if (type === "404") data = "Page Not Found";
  else if (type === "401") data = "Please Sign In to View The Content";
  else data = "Oops! Something Went Wrong";

  return (
    <div className="Error">
      <Box
        component="main"
        sx={{
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
        }}
      >
        <Container maxWidth="md">
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                mb: 3,
                textAlign: "center",
              }}
            >
              <img
                alt="Under development"
                src={photoLink}
                style={{
                  display: "inline-block",
                  maxWidth: "100%",
                  width: 400,
                }}
              />
            </Box>
            <Typography align="center" sx={{ mb: 3 }}>
              {data}
            </Typography>
            <Button
              onClick={() => navigate("/")}
              startIcon={
                <SvgIcon fontSize="small">{<ArrowBackIcon />}</SvgIcon>
              }
              sx={{ mt: 2, height: "60px", width: "250px" }}
              variant="contained"
            >
              Go back to Home
            </Button>
          </Box>
        </Container>
      </Box>
    </div>
  );
}

export default Error;
