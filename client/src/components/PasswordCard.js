import { Box, Button, Card, CardActions, CardContent, CardHeader, Divider, TextField, Unstable_Grid2 as Grid } from "@mui/material";
import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { toast } from "react-toastify";
import axios from "axios";

export default function PasswordCard()
{
  const { user, isFetching, dispatch } = useContext(UserContext);
  const [formData, setFormData] = useState({ oldPassword: "", newPassword: "", confirmPassword: "" });

  const handleChange = (event) => {
    setFormData((prevState) => ({ ...prevState, [event.target.name]: event.target.value.trim() }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { oldPassword, newPassword, confirmPassword } = formData;

    if( oldPassword === newPassword )
    {
      toast.error("New Password cannot be same as Old Password");
      return;
    }

    if( newPassword.length < 8 )
    {
      toast.error("Password must be atleast 8 characters long");
      return;
    } 

    if( newPassword !== confirmPassword )
    {
      toast.error("Passwords do not match");
      return;
    }

    if( oldPassword === "" || newPassword === "" || confirmPassword === "" )
    {
      toast.error("Please fill all the fields");
      return;
    }

    dispatch({ type: "UPDATE_START" });
    axios
      .post("http://localhost:42690/api/users/change-password", 
      { oldPassword, newPassword }, 
      { headers: { Authorization: `Bearer ${user.token}` } })
      .then(({data}) => {
        dispatch({ type: "UPDATE_SUCCESS", payload: { token: data.token, image: data.image } });
        setFormData(() => ({ oldPassword: "", newPassword: "", confirmPassword: "" }));
        toast.success("Password Changed Successfully");
      })
      .catch(() => {
        dispatch({ type: "UPDATE_FAILURE" });
        toast.error("Failure to change password");
      });

  };

  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit}>
      <Card className="ProfileDetails PasswordDetails">
        <CardHeader title="Password" />

        <CardContent sx={{ pt: 0 }}>
          
          <Box>
            
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  required
                  label="Old Password"
                  type="password"
                  name="oldPassword"
                  value={formData.oldPassword}
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
                  value={formData.newPassword}
                  onChange={handleChange}
                />
              </Grid>
              
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  required
                  label="Confirm Password"
                  type="password"
                  value={formData.confirmPassword}
                  name="confirmPassword"
                  onChange={handleChange}
                />
              </Grid>
            </Grid>

          </Box>
        </CardContent>

        <Divider />
        
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button variant="contained" sx={{ mt: 2}} disabled={isFetching} onClick={handleSubmit} > Save Password</Button>
        </CardActions>
      
      </Card>
    </form>
  );
};
