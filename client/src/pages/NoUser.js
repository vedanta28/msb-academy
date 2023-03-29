import Head from 'next/head';
import NextLink from 'next/link';
// import ArrowLeftIcon from '@heroicons/react/24/solid/ArrowLeftIcon';
import { Box, Button, Container, SvgIcon, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Page = () => (
  <div className="Base NoUser">
    <Head>
      {/* <title>
        401 | Sign In To View Your Courses
      </title> */}
    </Head>
    <Box
      component="main"
      sx={{
        alignItems: 'center',
        display: 'flex',
        flexGrow: 1,
        minHeight: '100%'
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Box
            sx={{
              mb: 3,
              textAlign: 'center'
            }}
          >
            <img
              alt="Under development"
              src="./error-401.png"
              style={{
                display: 'inline-block',
                maxWidth: '100%',
                width: 400
              }}
            />
          </Box>
          <Typography
            align="center"
            sx={{ mb: 3 }}
          >
            Please Sign In To View Your Courses
          </Typography>
          <Button
            component={NextLink}
            href="/"
            startIcon={(
              <SvgIcon fontSize="small">
                {<ArrowBackIcon />}
              </SvgIcon>
            )}
            sx={{ mt: 2, height: "60px", width: "250px" }}
            variant="contained"
          >
            Go back to Home
          </Button>
        </Box>
      </Container>
    </Box>
  </div>
);

export default Page;