import { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import storage from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify";

import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";

import LocationOnIcon from "@mui/icons-material/LocationOn";

let userDetails = {};

export default function ProfileCard() {
  const { user } = useContext(UserContext);
  const [imageUpload, setImageUpload] = useState(null);
  const [imageURL, setImageURL] = useState("");

  // On Rendering Profile.js
  useEffect(() => {
    getDownloadURL(ref(storage, `users/${user.image}`))
      .then((url) => {
        setImageURL(url);
      })
      .catch((err) => {
        setImageURL("/default.jpg");
      });

    axios
      .get("http://localhost:42690/api/users/user-details", {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => {
        // console.log(res);
        userDetails = res.data.fetchedUser;
      })
      .catch((err) => {
        // console.log(err);
        toast.error("Failure to Load Profile");
      });
  }, []);

  // To Save Image Upload
  const saveImage = () => {
    if (imageUpload == null) return;

    toast.info("Processing Request");
    const imageRef = ref(storage, `users/${user.image}`);
    uploadBytes(imageRef, imageUpload).then((res) => {
      getDownloadURL(res.ref)
        .then((url) => {
          setImageURL(url);
        })
        .catch((err) => {
          toast.error("Something Went Wrong");
          setImageURL("/default.jpg");
        });
    });
  };

  return (
    <Card className="ProfileCard">
      <CardContent>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Avatar
            src={imageURL}
            sx={{
              height: 80,
              mb: 2,
              width: 80,
              border: "1px solid black",
              backgroundSize: "contain",
            }}
          />

          <Typography gutterBottom variant="h5">
            {userDetails.fname} {userDetails.lname}
          </Typography>

          <Box sx={{ display: "flex", margin: "5px" }}>
            <Typography color="text.secondary" variant="body2">
              {userDetails.role}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", margin: "5px" }}>
            <Typography color="text.secondary" variant="body2">
              {userDetails.emailId}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", margin: "5px" }}>
            <LocationOnIcon fontSize="small" />
            <Typography color="text.secondary" variant="body2">
              {userDetails.state}, {userDetails.country}
            </Typography>
          </Box>
        </Box>
      </CardContent>
      <hr
        style={{ width: "90%", borderTop: "0.2px solid rgba(230,230,230)" }}
      />

      <CardActions sx={{ display: "flex", justifyContent: "space-evenly" }}>
        {/* Button to Upload Image */}
        <Button
          component="label"
          sx={{
            backgroundColor: "white",
            marginTop: "5px",
            ":hover": {
              backgroundColor: "white",
            },
          }}
        >
          Upload File
          <input
            type="file"
            onChange={(e) => {
              toast.info("Save Changes");
              setImageUpload(e.target.files[0]);
            }}
            hidden
          />
        </Button>

        {/* Button to Save Changes */}
        <Button
          component="label"
          sx={{
            backgroundColor: "white",
            marginTop: "5px",
            ":hover": {
              backgroundColor: "white",
            },
          }}
          disableTouchRipple
          onClick={saveImage}
        >
          Save Changes
        </Button>
      </CardActions>
    </Card>
  );
}
