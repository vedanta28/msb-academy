import "./stylesheets/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavContainer from "./components/NavContainer";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import SignIn from "./pages/SignIn";
import CreateNewCourse from "./pages/CreateNewCourse";
import Course from "./pages/Course";
import Profile from "./pages/Profile";
import Footer from "./components/Footer";
import Error from "./pages/Error";

function App() {
  const user = true;

  const my_data = [
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

  const text1 = "All Courses";
  const text2 = "My Courses";
  const text3 = "Check Out";

  return (
    <div className="App">
      <Router>
        <NavContainer />
        <div className="Sections">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/courses"
              element={<Courses data={my_data} text={text1} />}
            />
            <Route
              path="/classroom"
              element={
                user ? (
                  <Courses data={my_data} text={text2} />
                ) : (
                  <Error type="401" />
                )
              }
            />

            <Route
              path="/checkout"
              element={user ? <Courses data={my_data} text={text3} checkout={true} /> : <Error type="401" />}
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
              path="/create-course"
              element={user ? <CreateNewCourse /> : <Error type="401" />}
            />

            <Route path="/signin" element={<SignIn />} />
            <Route path="/error" element={<Error type="500" />} />
            <Route path="*" element={<Error type="404" />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
