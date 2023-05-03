import { useCallback, useState,useEffect,useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
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
import axios from "axios";
import { toast } from "react-toastify";

import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function ProfileDetails() {
  
  const { user } = useContext(UserContext);
  const [userDetails, setUserDetails] = useState({});
  const { dispatch, isFetching } = useContext(UserContext);
  const [dob, setDob] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:42690/api/users/user-details", {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => {
        console.log(res.data.fetchedUser);
        setUserDetails(
           (prevState) => ( { ...prevState, ...res.data.fetchedUser })
        );
      })
      .catch((err) => {
        toast.error("Failure to Load Profile");
      });
  }, []);

  const [value, setValue] = useState(dayjs(userDetails.dob));

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(userDetails);
    if (userDetails.fname === "" || userDetails.lname === "" || userDetails.state === "" || userDetails.country === "" || userDetails.phoneNo === "") {
      toast.error("Please fill all the fields");
      return;
    }
    let { fname, lname, state, country, phoneNo } = userDetails;
    axios
      .put("http://localhost:42690/api/users/user-details", { fname, lname, state, country, phoneNo}, {
        headers: { Authorization: `Bearer ${user.token}` }
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failure to update User");
      });
  };

  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit}>
      <Card className="ProfileDetails">
        <CardHeader title="Details" />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
              <TextField
                fullWidth
                label="First name"
                name="fname"
                required
                value = { `${userDetails.fname}` || "" }
                onChange={(e) => {
                  setUserDetails({
                    ...userDetails,
                    fname: e.target.value
                  });
                }}
              />
              </Grid>

              <Grid xs={12} md={6}>
              <TextField
                fullWidth
                label="Last name"
                name="lname"
                required
                value = { `${userDetails.lname}` || "" }
                onChange={(e) => {
                  setUserDetails({
                    ...userDetails,
                    lname: e.target.value
                  });
                }}
              />
              </Grid>

              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phoneNo"
                  value = { `${userDetails.phoneNo}` || "" }
                  onChange={(e) => {
                    setUserDetails({
                      ...userDetails,
                      phoneNo: e.target.value
                    });
                  }}
                />
              </Grid>

              <Grid xs={12} md={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Date of Birth"
                    value={value}
                    sx={{
                      width: "100%",
                    }}
                    required
                    onChange={(newValue) => {
                      setDob(newValue);
                    }}
                    slotProps={{
                      textField: {
                        helperText: 'MM / DD / YYYY',
                      },
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Country"
                  name="country"
                  value = { `${userDetails.country}` || "" }
                  onChange={(e) => {
                    setUserDetails({
                      ...userDetails,
                      country: e.target.value
                    });
                  }}
                />
              </Grid>

              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="State"
                  name="state"
                  value = { `${userDetails.state}` || "" }
                  onChange={(e) => {
                    setUserDetails({
                      ...userDetails,
                      state: e.target.value
                    });
                  }}
                />
              </Grid>

            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button type="submit" variant="contained" disabled={isFetching} sx={{ mt: 2}}>Save details</Button>
        </CardActions>
      </Card>
    </form>
  );
}
