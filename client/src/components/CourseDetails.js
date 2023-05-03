import { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { toast } from "react-toastify";
import storage from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import axios from "axios";
import { useParams } from "react-router-dom";

// MATERIAL UI
import {
  CardMedia,
  Button,
  Container,
  Stack,
  Typography,
  Card,
  CardContent,
  Rating,
} from "@mui/material";

// ICONS
import ShareIcon from "@mui/icons-material/Share";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

function CourseDetails({ Data, CourseID, Instructor }) {

  // IDENTIFY THE ID
  const { id } = useParams();

  // BRING IN USER
  const { user } = useContext(UserContext);

  // HANDLE IMAGE UPLOAD
  const [imageUpload, setImageUpload] = useState(null);
  const [imageURL, setImageURL] = useState("/defaultCover.png");
  useEffect(() => {
    getDownloadURL(ref(storage, `courses/${CourseID}.jpg`))
      .then((url) => {
        setImageURL(url);
      })
      .catch((err) => {
        setImageURL("/defaultCover.png");
      });
  }, []);

  // To Save Image Upload
  const saveImage = () => {
    if (imageUpload == null) return;

    toast.info("Processing Request");
    const imageRef = ref(storage, `courses/${CourseID}.jpg`);
    uploadBytes(imageRef, imageUpload).then((res) => {
      getDownloadURL(res.ref)
        .then((url) => {
          setImageURL(url);
        })
        .catch((err) => {
          toast.error("Something Went Wrong");
          setImageURL("/defaultCover.png");
        });
    });
  };

  // To Handle Buy Now
  const handleBuy = () => {
    axios
      .post(
        "http://localhost:42690/api/users/add-course",
        { courseID: CourseID },
        { headers: { Authorization: `Bearer ${user.token}` } }
      )
      .then((res) => {
        toast.success("Added To Cart");
      })
      .catch((err) => {
        toast.error("Failed to Add");
      });
  };
  // RATINGS
  const [ratingValue, setRatingValue] = useState(2.5);
  // HANDLE RATING CHANGES
  const handleRatingChange = (newValue) => {
    // do something with the new rating value
    console.log("New rating value:", newValue);
    console.log(`Rating for course ${id} changed to newValue`);
    setRatingValue(newValue);
    let courseID = id;
    let rating = newValue;
    axios
      .put("http://localhost:42690/api/users/update-rating", { courseID, rating }, {
        headers: { Authorization: `Bearer ${user.token}` }
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        toast.error("Failure to update User");
      });

  };

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: "5px",
        height: "360px",
        width: "1000px",
        mx: "auto",
        mb: 10,
        boxShadow: "5px 5px 10px 1px rgba(0,0,0,0.1)",
      }}
    >
      <CardContent>
        <Container style={{ display: "flex" }}>
          {/* Left Column */}
          <Stack>
            {/* Course Image */}
            <CardMedia
              component="img"
              image={`${imageURL}`}
              alt={Data.name}
              style={{
                borderRadius: "10px",
                height: "220px",
                width: "330px",
                marginRight: "30px",
                marginBottom: "10px",
                verticalAlign: "middle",
              }}
            />

            {Instructor && (
              <>
                {/* Buttons to Upload */}
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
                      toast.info("Please Save Changes");
                      setImageUpload(e.target.files[0]);
                    }}
                    hidden
                  />
                </Button>

                {/* Button to Save */}
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
              </>
            )}
          </Stack>

          {/* Right Column */}
          <Stack spacing={3}>
            <Stack spacing={15} direction="row">
              {/* Inside Left Column */}
              <Stack>
                {/* Course Name */}
                <Typography
                  component="div"
                  variant="h1"
                  style={{
                    maxWidth: "327px",
                    marginBottom: "20px",
                    fontFamily: "Kanit, sans-serif",
                    fontSize: "24px",
                  }}
                >
                  {Data.name}
                </Typography>

                {/* Instructor Name */}
                <Typography
                  component="div"
                  variant="h4"
                  style={{
                    maxWidth: "400px",
                    marginBottom: "10px",
                    fontFamily: "Kanit, sans-serif",
                    fontSize: "18px",
                    color: "#3C4852",
                  }}
                >
                  {Data.InstructorName}
                </Typography>

                {/* Coursecription */}
                <Typography
                  component="div"
                  variant="paragraph"
                  style={{
                    maxWidth: "400px",
                    marginBottom: "10px",
                    textAlign: "justify",
                  }}
                >
                  {Data.description}
                </Typography>
              </Stack>

              {/* Inside Right Column */}
              <Stack spacing={1} sx={{ margin: "auto" }}>
                {/* Button To Purchase */}
                {!Instructor && (
                  <Button
                    variant="contained"
                    startIcon={<ShoppingCartIcon />}
                    style={{
                      color: "white",
                      backgroundColor: "#027EFF",
                      height: "48px",
                      width: "176px",
                    }}
                    onClick={handleBuy}
                  >
                    Buy Now
                  </Button>
                )}

                {/* Button To Share */}
                <Button
                  variant="contained"
                  startIcon={<ShareIcon />}
                  style={{
                    color: "black",
                    backgroundColor: "white",
                    height: "48px",
                    width: "176px",
                    marginBottom: "auto",
                  }}
                >
                  Share
                </Button>
                <Rating
                  name="half-rating"
                  value={ratingValue}
                  precision={0.5}
                  style={{
                    marginRight: "auto",
                    marginLeft: "auto",
                  }}
                  onChange={(event, newValue) => {
                    handleRatingChange(newValue);
                  }}
                />
              </Stack>
            </Stack>
          </Stack>
        </Container>
      </CardContent>
    </Card>
  );
}

export default CourseDetails;
