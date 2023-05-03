import { useCallback, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid,
} from "@mui/material";

export default function ProfileDetails()
{
  const handleChange = useCallback((event) => {
  }, []);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
  }, []);

  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit}>
      <Card className="ProfileDetails PasswordDetails">
        <CardHeader title="Password" />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  required
                  label="Old Password"
                  type="password"
                  name="oldpassword"
                  onChange={handleChange}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  required
                  label="New Password"
                  type="password"
                  name="newPassword"
                  onChange={handleChange}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  required
                  label="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button variant="contained" sx={{ mt: 2}}>Save Password</Button>
        </CardActions>
      </Card>
    </form>
  );
};
