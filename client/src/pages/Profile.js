import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from "@mui/material";

// Importing stylesheets
import "../stylesheets/Profile.css";

// Importing components
import ProfileCard from "../components/ProfileCard";
import ProfileDetails from "../components/ProfileDetails";
import PasswordCard from "../components/PasswordCard";

export default function Profile() {

  return (
    <div className="Profile">
      <Box component="main" sx={{ flexGrow: 1, py: 8, }}>
        <Container maxWidth="lg">
          <Stack spacing={3}>
            <Typography variant="h4" sx={{ fontFamily: "Open Sans" }}>Profile</Typography>
            <Grid container spacing={3}>
              <Grid xs={12} md={6} lg={4}>
                <ProfileCard />
              </Grid>
              <Grid xs={12} md={6} lg={8}>
                <ProfileDetails />
                <PasswordCard />
              </Grid>
            </Grid>
          </Stack>
        </Container>
      </Box>
    </div>
  );
}