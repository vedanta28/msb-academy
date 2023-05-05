import { Avatar, Box, Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

// Importing stylesheets
import { UserContext } from "../context/UserContext";
import { ReloaderContext } from "../context/Reloader";

// Importing Firebase Settings
import storage from "../firebase";

export default function ProfileCard() {

  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const { reload, dispatch } = useContext(ReloaderContext);
  const [formData, setUserDetails] = useState({});
  const [imageUpload, setImageUpload] = useState(null);
  const [imageURL, setImageURL] = useState("");

  // On Rendering Profile.js
  useEffect(() => {

    // FOR IMAGE
    getDownloadURL(ref(storage, `users/${user.image}`))
      .then((url) => {
        setImageURL(url);
      })
      .catch(() => {
        setImageURL("/default.jpg");
      });

    // FOR DETAILS
    axios
      .get("http://localhost:42690/api/users/user-details", {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then(({ data }) => {
        setUserDetails((prevState) => ({ ...prevState, ...data.fetchedUser }));
      })
      .catch(() => {
        toast.error("Failure to Load Profile");
      });

  }, [reload]);

  // handleChange
  const handleChange = (e) => {
    setImageUpload(() => e.target.files[0]);
    setLoading(true);
    toast.info("Please Save Changes");
  };

  // To Save Image Upload
  const saveImage = () => {
    if (imageUpload == null) return;

    toast.info("Processing Request");
    const imageRef = ref(storage, `users/${user.image}`);
    uploadBytes(imageRef, imageUpload).then(({ ref }) => {
      getDownloadURL(ref)
        .then((url) => {
          setImageURL(url);
          dispatch({ type: "RELOAD" });
        })
        .catch(() => {
          toast.info(() => "Failed To Upload Image");
        });
    });
    setLoading(false);
  };

  return (
    <Card className="ProfileCard">
      <CardContent>

        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        
          {/* USER IMAGE */}
          <Avatar
            src={imageURL}
            sx={{
              mb: 2,
              width: 80,
              height: 80,
              border: "1px solid black",
              backgroundSize: "contain",
            }}
          />

          {/* USER NAME */}
          <Typography gutterBottom variant="h5">
            {formData.fname} {formData.lname}
          </Typography>

          {/* USER ROLE */}
          <Box sx={{ display: "flex", margin: "5px" }}>
            <Typography color="text.secondary" variant="body2">
              {formData.role}
            </Typography>
          </Box>

          {/* EMAIL ID */}
          <Box sx={{ display: "flex", margin: "5px" }}>
            <Typography color="text.secondary" variant="body2">
              {formData.emailId}
            </Typography>
          </Box>

          {/* LOCATION */}
          {(formData && formData.state) &&
            <Box sx={{ display: "flex", margin: "5px" }}>
              <LocationOnIcon fontSize="small" />
              <Typography color="text.secondary" variant="body2">
                {formData.state}, {formData.country}
              </Typography>
            </Box>
          }

        </Box>
      </CardContent>

      <hr style={{ width: "90%", borderTop: "0.2px solid rgba(230,230,230)" }} />

      <CardActions sx={{ display: "flex", justifyContent: "space-evenly" }}>

        {/* Button to Upload Image */}
        <Button
          component="label"
          disabled={loading}
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
            onChange={handleChange}
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
