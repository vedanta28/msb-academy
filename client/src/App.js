import "./stylesheets/App.css";
import NavContainer from "./components/NavContainer";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import Course from "./pages/Course";
import Courses from "./pages/Courses";
import Classroom from "./pages/Classroom";
import Profile from "./pages/Profile";
import CheckOut from "./pages/CheckOut";
import NoUser from "./pages/NoUser";
import Footer from "./components/Footer";

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
            <Route path="/classroom">
              <Route index element={user ? <Classroom /> : <NoUser />} />
              <Route path=":id" element={user ? <Course /> : <NoUser />} />
            </Route>
            <Route path="/profile" element={user ? <Profile /> : <NoUser />} />
            <Route
              path="/checkout"
              element={user ? <CheckOut /> : <NoUser />}
            />
            <Route path="/signin" element={<SignIn />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
