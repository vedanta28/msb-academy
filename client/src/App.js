import "./stylesheets/App.css";
import NavContainer from "./components/NavContainer";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import Course from "./pages/Course";
import Courses from "./pages/Courses";
import Classroom from "./pages/Classroom";
import Profile from "./pages/Profile";
import CheckOut from "./pages/CheckOut";
import Error from "./pages/Error";
import Footer from "./components/Footer";
import CreateNewCourse from "./pages/CreateNewCourse";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  const user = true;

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
            <Route path="/profile" element={user ? <Profile /> : <Error type="401" />} />
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
