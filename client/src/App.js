// Description: This file contains the main App component which is the parent component of all other components.

// importing react-router-dom, hooks and context
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext, useEffect } from "react";
import axios from "axios";
import { UserContext } from "./context/UserContext";
import { CoursesContext } from "./context/CoursesContext";

// importing stylesheets
import "./stylesheets/App.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// importing Navbar-Container
import NavContainer from "./components/NavContainer";

// importing Pages
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Classroom from "./pages/Classroom";
import SignIn from "./pages/SignIn";
import NewCourse from "./pages/NewCourse";
import Course from "./pages/Course";
import Profile from "./pages/Profile";
import Footer from "./components/Footer";
import Error from "./pages/Error";
import Checkout from "./pages/Checkout";

function App() {
  
  const { user } = useContext(UserContext);
  const { dispatch } = useContext(CoursesContext);

  useEffect(() => {
    dispatch({ type: "LOAD_START" });
    axios.get("http://localhost:42690/api/courses")
      .then((res) => {
        dispatch({ type: "LOAD_SUCCESS", payload: res.data.courses });
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failure to Load Courses");
        dispatch({ type: "LOAD_FAILURE" });
      });
  },[]);

  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Router>

        <NavContainer />

        <div className="Sections">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/courses"
              element={<Courses />}
            />

            <Route
              path="/NewCourse"
              element={
                user ? (
                 <NewCourse/>
                ) : (
                  <Error type="401" />
                )
              }
            />

            <Route
              path="/classroom"
              element={
                user ? (
                 <Classroom/>
                ) : (
                  <Error type="401" />
                )
              }
            />

            <Route
              path="/checkout"
              element={user ? <Checkout /> : <Error type="401" />}
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
              element={user ? <NewCourse /> : <Error type="401" />}
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