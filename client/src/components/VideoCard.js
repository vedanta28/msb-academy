import { Stack, Typography, Card, CardContent } from "@mui/material";

function VideoCard({Data}) {
  // const dateArray = Data.VideoDate.split(" ");
  const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }
  let day = new Date(Data.vDate).toDateString().split(" ")[2];
  let month = new Date(Data.vDate).toDateString().split(" ")[1];
  return (
    <Card
      className="VideoCard"
      elevation={0}
      sx={{
        backgroundColor: "white",
        borderRadius: "7px",
        height: "90px",
        width: "752px",
        boxShadow: "5px 5px 10px 1px rgba(0,0,0,0.1)"
      }}
      onClick={() => openInNewTab(`${Data.vLink}`)}
    >
      <CardContent style={{ padding: "none" }}>
        <Stack spacing={5} direction="row">
          <Stack spacing={0.5}>
            <Typography
              variant="h1"
              style={{
                maxWidth: "327px",
                fontFamily: "Kanit, sans-serif",
                fontSize: "18px",
                marginLeft: "auto",
                marginRight: "auto"
              }}
            >
              {month}
            </Typography>
            <Typography
              variant="button"
              style={{
                maxWidth: "327px",
                fontFamily: "Kanit, sans-serif",
                fontSize: "24px",
                marginLeft: "auto",
                marginRight: "auto"
              }}
            >{day}</Typography>
          </Stack>
          <Stack spacing={2.5}>
            <Typography
              variant="h3"
              color="#3A4853"
              style={{ maxWidth: "640px", fontFamily: "Kanit, sans-serif", fontSize: "18px"}}
            >
              {Data.vName}
            </Typography>
            <Typography
              component="p"
              color="#7B8A95"
              style={{ maxWidth: "640px", fontFamily: "Kanit, sans-serif", fontSize: "14px"}}
            >
              {`Lesson ${Data.vID} \t | \t ${Data.vDuration} Minutes`}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default VideoCard;
