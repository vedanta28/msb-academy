import { Box, Button, Card, CardActions, CardContent, CardHeader, Divider, TextField, Unstable_Grid2 as Grid } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import axios from "axios";

// Importing contexts 
import { UserContext } from "../context/UserContext";
import { ReloaderContext } from "../context/Reloader";

export default function ProfileDetails() {

  const { reload, dispatch } = useContext(ReloaderContext);
  const { user, isFetching } = useContext(UserContext);
  const [formData, setFormData] = useState({});
  const [dob, setDob] = useState(dayjs(formData.dob));

  // Fetch User Details
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/users/user-details`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then(({data}) => {
        setFormData((prevState) => ({ ...prevState, ...data.fetchedUser }));
        setDob(() => dayjs(data.fetchedUser.dob));
      })
      .catch(() => {
        toast.error("Failed to Load Profile");
      });
  }, [reload]);

  // Handle Change
  const handleChange = (e) => { 
    setFormData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  // Handle Submit
  const handleSubmit = async (event) => {

    event.preventDefault();
    const { fname, lname, state, country, phoneNo } = formData;

    if (fname === "" || lname === "" || state === "" || country === "" || phoneNo === "") {
      toast.error("No Changes Made");
      return;
    }

    // Send Request
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/users/user-details`,
        { fname, lname, state, country, phoneNo },
        { headers: { Authorization: `Bearer ${user.token}` }})
      .then(() => {
        toast.success("User Details Updated");
        dispatch({ type: "RELOAD" });
      })
      .catch(() => {
        toast.error("Failed to Update User Details");
      });
  };

  return (

    <form autoComplete="off" noValidate onSubmit={handleSubmit}>
      <Card className="ProfileDetails">
        <CardHeader title="Details" />
        <CardContent sx={{ pt: 0 }}>
          <Box>
            <Grid container spacing={3}>

              {/* FIRST NAME */}
              <Grid xs={12} md={6}>
                <TextField
                  name="fname"
                  label="First name"
                  fullWidth
                  required
                  value={ (formData && formData.fname) ? formData.fname : ""}
                  onChange={handleChange}
                />
              </Grid>

              {/* LAST NAME */}
              <Grid xs={12} md={6}>
                <TextField
                  name="lname"
                  fullWidth
                  label="Last name"
                  required
                  value={ (formData && formData.lname) ? formData.lname : ""}
                  onChange={handleChange}
                />
              </Grid>

              {/* PHONE NUMBER */}
              <Grid xs={12} md={6}>
                <TextField
                  name="phoneNo"
                  fullWidth
                  label="Phone Number"
                  value={ (formData && formData.phoneNo) ? formData.phoneNo : ""}
                  onChange={handleChange}
                />
              </Grid>

              {/* DATE OF BIRTH */}
              <Grid xs={12} md={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Date of Birth"
                    value={dob}
                    sx={{
                      width: "100%",
                    }}
                    disabled
                    required
                    slotProps={{
                      textField: {
                        helperText: 'MM / DD / YYYY',
                      },
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Grid>

              {/* COUNTRY */}
              <Grid xs={12} md={6}>
                <TextField
                  name="country"
                  fullWidth
                  label="Country"
                  value={ (formData && formData.country) ? formData.country : ""}
                  onChange={handleChange}
                />
              </Grid>

              {/* STATE */}
              <Grid xs={12} md={6}>
                <TextField
                  name="state"
                  fullWidth
                  label="State"
                  value={ (formData && formData.state) ? formData.state : ""}
                  onChange={handleChange}
                />
              </Grid>

            </Grid>
          </Box>

        </CardContent>
        <Divider />

        {/* SAVE DETAILS BUTTON */}
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button type="submit" variant="contained" disabled={isFetching} sx={{ mt: 2 }}>Save details</Button>
        </CardActions>

      </Card>
    </form>
  );
}
