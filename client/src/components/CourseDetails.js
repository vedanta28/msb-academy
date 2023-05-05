import { CardMedia, Button, Container, Stack, Typography, Card, CardContent, Rating } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShareIcon from "@mui/icons-material/Share";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

// Importing Firebase Settings
import storage from "../firebase";

// Importing Context
import { UserContext } from "../context/UserContext";
import { ReloaderContext } from "../context/Reloader";

function CourseDetails({ Data, CourseID, Bought }) {

  // BRING IN USER
  const rating = Bought.rating * 1;
  const { user } = useContext(UserContext);
  const { reload, dispatch } = useContext(ReloaderContext);

  // HANDLE IMAGE UPLOAD
  const [imageUpload, setImageUpload] = useState(null);
  const [imageURL, setImageURL] = useState("/defaultCover.png");
  const [loading, setLoading] = useState(false);
  const [ratingValue, setRatingValue] = useState(rating);

  useEffect(() => {
    getDownloadURL(ref(storage, `courses/${CourseID}.jpg`))
      .then((url) => {
        setImageURL(() => url);
      })
      .catch(() => {
        setImageURL("/defaultCover.png");
      });
    setRatingValue(() => Bought.rating * 1);
  }, [rating, reload]);

  // To Save Image Upload
  const saveImage = () => {
    
    if (imageUpload == null) 
      return;

    toast.info("Processing Request");
    const imageRef = ref(storage, `courses/${CourseID}.jpg`);
    uploadBytes(imageRef, imageUpload).then((res) => {
      getDownloadURL(res.ref)
        .then((url) => {
          setImageURL(url);
          dispatch({ type: "RELOAD" });
        })
        .catch(() => {
          toast.error("Something Went Wrong");
        });
    });
    setLoading(false);
  };

  // To Handle Buy Now
  const handleBuy = () => {
    axios
      .post(
        "http://localhost:42690/api/users/add-course",
        { courseID: CourseID },
        { headers: { Authorization: `Bearer ${user.token}` } }
      )
      .then(({data}) => {
        
        if(data.message.includes("Already Bought"))
          toast.info("Already Bought")
        else if(data.message.includes("Already Added"))
          toast.info("Already Added");
        else
          toast.success("Added To Cart");
      })
      .catch(() => {
        toast.error("Failed to Add");
      });
  };

  // Handle Image Change
  const handleImageChange = (e) => {
    toast.info("Please Save Changes");
    setImageUpload(() => e.target.files[0]);
    setLoading(true);
  };

  // HANDLE RATING CHANGES
  const handleRatingChange = (event,newValue) => {

    if (!newValue || newValue === ratingValue)
      return;

    setRatingValue(newValue);
    axios
      .post("http://localhost:42690/api/users/update-rating", 
      { courseID: CourseID, rating: newValue }, 
      {  headers: { Authorization: `Bearer ${user.token}` }})
      .then(() => {
        toast.success("Rating Updated");
        dispatch({ type: "RELOAD" });
      })
      .catch(() => {
        toast.error("Failed to update rating");
      });
  };

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: "5px",
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
          </Stack>

          {/* Right Column */}
          <Stack spacing={4}>

            <Stack direction="row" spacing={3} >
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
                    mb: 5,
                    color: "#3C4852",
                  }}
                >
                  Instructor:  {Data.instructorName}
                </Typography>

                {/* Coursecription */}
                <Typography
                  component="div"
                  variant="paragraph"
                  style={{ maxWidth: "400px", marginBottom: "10px", textAlign: "justify", mt: 5 }}
                >
                  {Data.description}
                </Typography>
              </Stack>

              {/* Inside Right Column */}
              <Stack spacing={3} sx={{ margin: "auto" }}>

                {/* Button To Purchase */}
                {
                  !Bought.bought &&
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
                }

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

                {
                  Bought.bought &&
                  <Rating
                    name="half-rating"
                    value={ratingValue}
                    precision={0.5}
                    style={{
                      marginRight: "auto",
                      marginLeft: "auto",
                    }}
                    onChange={handleRatingChange}
                  />
                }
              </Stack>

            </Stack>

            <Stack direction="row" spacing={3} >
              {Data.instructorID === user.image.split('.')[0] &&
                <>
                  {/* Buttons to Upload */}
                  < Button
                    component="label"
                    disabled={loading}
                    sx={{
                      backgroundColor: "white",
                      ":hover": {
                        backgroundColor: "white",
                      },
                    }}
                  >
                    Upload File
                    <input
                      type="file"
                      onChange={handleImageChange}
                      hidden
                    />
                  </Button>

                  {/* Button to Save */}
                  <Button
                    component="label"
                    sx={{
                      backgroundColor: "white",
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
              }
            </Stack>

          </Stack>
        </Container>
      </CardContent>
    </Card>
  );
}

export default CourseDetails;
