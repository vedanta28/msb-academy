import * as React from "react";
import Container from "@mui/material/Container";
// import Image from "next/image";
// import Link from "@/src/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export default function GuestFooter() {
  return (
    <Paper
      sx={{
        marginTop: "calc(10% + 60px)",
        width: "100%",
        position: "fixed",
        bottom: 0,
        width: "100%",
      }}
      component="footer"
      square
      variant="outlined"
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            flexGrow: 1,
            justifyContent: "center",
            display: "flex",
            my: 1,
          }}
        >
          {/* <div>
            <Image priority src="/Logo.svg" width={75} height={30} alt="Logo" />
            </div> */}
          <img
            src="/msb.svg"
            alt="Logo"
            style={{ width: "75px", height: "30px" }}
          />
        </Box>

        <Box
          sx={{
            flexGrow: 1,
            justifyContent: "center",
            display: "flex",
            mb: 2,
          }}
        >
          <Typography variant="caption" color="initial">
            Copyright ©2023. MSB Academy. All rights reserved.
          </Typography>
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            justifyContent: "right",
            display: "flex",
            mb: 2,
          }}
        >
          <FacebookIcon sx={{ ml: 1 }} />
          <YouTubeIcon sx={{ ml: 1 }} />
          <TwitterIcon sx={{ ml: 1 }} />
          <InstagramIcon sx={{ ml: 1 }} />
          <LinkedInIcon sx={{ ml: 1 }} />
        </Box>
      </Container>
    </Paper>
  );
}
