import {
  Avatar,
  Box,
  Chip,
  CardMedia,
  Container,
  Stack,
  Typography,
  Card,
  CardContent,
  Rating,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { useNavigate } from "react-router-dom";

import storage from "../firebase";
import { ref, getDownloadURL } from "firebase/storage";

import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { UserContext } from "../context/UserContext";


function CoursesCard({ Data, Checkout, val, fn }) {

  const { user } = useContext(UserContext);
  const [imageURL, setImageURL] = useState("/defaultCover.png");
  const [insImageURL, setInsImageURL] = useState("/default.jpg"); 

  // To Load Images
  useEffect(() => {
      getDownloadURL(ref(storage, `courses/${Data.imageCover}`)).then((url) => {
        setImageURL(url);
      }).catch((err) => {
        setImageURL("/defaultCover.png")
      })

      getDownloadURL(ref(storage, `users/${Data.instructorID}.jpg`)).then((url) => {
        setInsImageURL(url);
      }).catch((err) => {
        setInsImageURL("/default.jpg")
      })

  }, [])
 
  // To Remove Course From Checkout
  const handleDelete = () => {
    axios.post("http://localhost:42690/api/users/remove-course",
    { courseID: Data._id },
    { headers: { "Authorization": `Bearer ${user.token}` } })
    .then((res) => {
      toast.success("Removed From Cart");
      fn(!val);
    })
    .catch((err) => {
      toast.error("Failed to Remove");
    });
  };
  
  const navigate = useNavigate();
  
  return (
    <Card
      sx={{
        backgroundColor: "white",
        borderRadius: "7px",
        height: "215px",
        width: "1050px",
        marginBottom: "20px",
        marginLeft: "auto",
        marginRight: "auto",
        boxShadow: "5px 5px 10px 1px rgba(0,0,0,0.1)"
      }}
      elevation={0}
      // className="course-card"
    >
      <CardContent style={{ padding: "none" }}>
        <Container style={{ display: "flex", padding: "none" }}>
          <Stack>
            <CardMedia
              component="img"
              image={imageURL}
              alt={Data.name}
              style={{
                borderRadius: "3px",
                height: "183px",
                width: "326px",
                marginRight: "30px",
                verticalAlign: "middle",
              }}
            />
          </Stack>
          <Stack spacing={1} sx={{width: "calc(100% - 330px)"}}>
            <Typography
              component="div"
              variant="h1"
              sx={{
                maxWidth: "auto",
                fontFamily: "Kanit, sans-serif",
                fontSize: "20px",
                ":hover": {
                  cursor: "pointer"
                }
              }}
              onClick={ () => navigate(`/course/${Data._id}`)}
            >
              {Data.name}
            </Typography>
            <Stack direction="row" spacing={1}>
              <Chip
                avatar={<Avatar alt="Natacha" src={insImageURL} />}
                label={Data.instructorName || "Instructor 007"}
                variant="filled"
              />
            </Stack>
            <Typography
              component="div"
              variant="caption"
              style={{
                maxWidth: "auto",
                fontFamily: "Kanit, sans-serif",
                fontSize: "14px",
                color: "#3C4852",
              }}
            >
              {Data.description}
            </Typography>
            <Rating
              name="half-rating-read"
              defaultValue={Data.rating}
              precision={0.5}
              readOnly
              sx={{ marginBottom: "auto" }}
            />
            <Box spacing="auto" sx={{display: "flex", justifyContent: "space-between"}}>
              <Typography
                component="div"
                variant="h4"
                style={{
                  maxWidth: "400px",
                  fontFamily: "Kanit, sans-serif",
                  fontSize: "22px",
                  color: "#3C4852",
                  marginTop: "auto",
                  marginBottom: "auto",
                }}
              >
                <CurrencyRupeeIcon sx={{ fontSize: "16px" }} />
                {Data.fees}
              </Typography>

              {Checkout && (
                <Chip
                  label="Remove"
                  deleteIcon={<DeleteIcon />}
                  onClick={handleDelete}
                  variant="outlined"
                  color="error"
                />
              )}
            </Box>
          </Stack>
        </Container>
      </CardContent>
    </Card>
  );
}

export default CoursesCard;