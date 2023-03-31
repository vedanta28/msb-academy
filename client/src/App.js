import "./stylesheets/App.css";
import NavContainer from "./components/NavContainer";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import Course from "./pages/Course";
import Courses from "./pages/Courses";
import Classroom from "./pages/Classroom";
import Profile from "./pages/Profile";
import CheckOut from "./pages/CheckOut";
import Footer from "./components/Footer";
import CreateNewCourse from "./pages/CreateNewCourse";

import Error from "./pages/Error";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const user = true;

  const data = [
    {
      _id: "1",
      Picture: "./sampleCourse.png",
      Language: "English",
      InstructorName: "Koustav Sen",
      InstructorImage: "./koustav.png",
      CourseName: "Complete Course on Computer Networks - Part I",
      Description:
        "In this course, Koustav will cover Computer Networks. All the important topics will be discussed in detail and would be helpful for aspirants preparing for the GATE exam.",
      TotalVideos: "10",
      StartDate: "21 Apr, 2021",
      EndDate: "7 May, 2021",
      TotalVideoLengh: "2h 30m",
      Price: 500,
      Rating: 4.5,
    },
    {
      _id: "2",
      Picture: "./sampleCourse.png",
      Language: "English",
      InstructorName: "Koustav Sen",
      InstructorImage: "./koustav.png",
      CourseName: "Complete Course on Computer Networks - Part II",
      Description:
        "In this course, Koustav will cover Computer Networks. All the important topics will be discussed in detail and would be helpful for aspirants preparing for the GATE exam.",
      TotalVideos: "10",
      StartDate: "21 Apr, 2021",
      EndDate: "7 May, 2021",
      TotalVideoLengh: "2h 30m",
      Price: 500,
      Rating: 4.5,
    },
    {
      _id: "3",
      Picture: "./sampleCourse.png",
      Language: "English",
      InstructorName: "Koustav Sen",
      InstructorImage: "./koustav.png",
      CourseName: "Complete Course on Computer Networks - Part III",
      Description:
        "In this course, Koustav will cover Computer Networks. All the important topics will be discussed in detail and would be helpful for aspirants preparing for the GATE exam.",
      TotalVideos: "10",
      StartDate: "21 Apr, 2021",
      EndDate: "7 May, 2021",
      TotalVideoLengh: "2h 30m",
      Price: 500,
      Rating: 4.5,
    },
    {
      _id: "4",
      Picture: "./sampleCourse.png",
      Language: "English",
      InstructorName: "Koustav Sen",
      InstructorImage: "./koustav.png",
      CourseName: "Complete Course on Computer Networks - Part IV",
      Description:
        "In this course, Koustav will cover Computer Networks. All the important topics will be discussed in detail and would be helpful for aspirants preparing for the GATE exam.",
      TotalVideos: "10",
      StartDate: "21 Apr, 2021",
      EndDate: "7 May, 2021",
      TotalVideoLengh: "2h 30m",
      Price: 500,
      Rating: 4.5,
    },
  ];

  return (
    <div className="App">
      <Router>
        <NavContainer />
        <div className="Sections">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route
              path="/classroom"
              element={user ? <Classroom /> : <Error type="401" />}
            />
            <Route
              path="/course/:id"
              element={user ? <Course /> : <Error type="401" />}
            />
            <Route
              path="/profile"
              element={user ? <Profile /> : <Error type="401" />}
            />
            <Route
              path="/checkout"
              element={user ? <CheckOut /> : <Error type="401" />}
            />
            <Route
              path="/create-course"
              element={user ? <CreateNewCourse /> : <Error type="401" />}
            />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/dev" element={<Error type="500" />} />
            <Route path="*" element={<Error type="404" />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
