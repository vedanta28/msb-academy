import React, { useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import Course from "./pages/Course";
import Courses from "./pages/Courses";
import Classroom from "./pages/Classroom";
import Profile from "./pages/Profile";
import CheckOut from "./pages/CheckOut";
import NoUser from "./pages/NoUser";
import Footer from "./components/footer";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  const user = true;

  // For Changing Color of Navbar on Scroll
  const [scroll, setScroll] = useState(false);
  window.addEventListener("scroll", () => {
    const scrollCheck = window.scrollY > 20;
    if (scrollCheck !== scroll) {
      setScroll(!scroll);
    }
  });

  return (
    <div className="App">
      <Router>
        <div
          className="NavContainer"
          style={{
            backgroundColor: scroll ? "white" : "transparent",
          }}
        >
          {/* <MyAppBar /> */}
          <NavBar />
        </div>

        <div className="Sections">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route
              path="/classroom"
              element={user ? <Classroom /> : <NoUser />}
            />
            <Route
              path="/course/:id"
              element={user ? <Course /> : <NoUser />}
            />
            <Route path="/profile" element={user ? <Profile /> : <NoUser />} />
            <Route
              path="/checkout"
              element={user ? <CheckOut /> : <NoUser />}
            />
            <Route path="/signin" element={<SignIn />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
      <Footer/>
    </div>
  );
}
export default App;
