import {
  Box,
  Container,
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import ProfileCard from "../components/ProfileCard";
import ProfileDetails from "../components/ProfileDetails";
import PasswordCard from "../components/PasswordCard";

const Page = () => (
  <div className="Base Profile">
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <div>
            <Typography variant="h4" sx={{ fontFamily: "Open Sans"}}>Profile</Typography>
          </div>
          <div>
            <Grid container spacing={3}>
              <Grid xs={12} md={6} lg={4}>
                <ProfileCard />
              </Grid>
              <Grid xs={12} md={6} lg={8}>
                <ProfileDetails />
                <PasswordCard />
              </Grid>
            </Grid>
          </div>
        </Stack>
      </Container>
    </Box>
  </div>
);

Page.getLayout = (page) => <div>{page}</div>;
export default Page;
