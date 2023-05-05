// Importing react-router-dom, hooks and context
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Importing context
import { UserContext } from "./context/UserContext";

// Importing stylesheets
import "./stylesheets/App.css";

// Importing Components
import NavContainer from "./components/NavContainer";
import Footer from "./components/Footer";

// Importing Pages
import Home from "./pages/Home";
import Error from "./pages/Error";
import SignIn from "./pages/SignIn";
import Course from "./pages/Course";
import Profile from "./pages/Profile";
import Courses from "./pages/Courses";
import Checkout from "./pages/Checkout";
import NewCourse from "./pages/NewCourse";
import Classroom from "./pages/Classroom";

function App() {

  const { user } = useContext(UserContext);

  return (
    <div className="App">

      {/* Toast Container */}
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

        {/* Sections */}
        <div className="Sections">

          <Routes>

            <Route
              path="/"
              element={<Home />}
            />

            <Route
              path="/courses"
              element={<Courses />}
            />

            <Route
              path="/signin"
              element={<SignIn />}
            />

            {/* Protected Routes */}
            <Route
              path="/new-course"
              element={user ? (<NewCourse />) : (<Error type="401" />)}
            />

            <Route
              path="/classroom"
              element={user ? (<Classroom />) : (<Error type="401" />)}
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
              path="*"
              element={<Error type="404" />}
            />

          </Routes>

        </div>

        <Footer />
      </Router>

    </div>
  );
}

export default App;