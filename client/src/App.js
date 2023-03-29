import React, { useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import SignIn from "./pages/SignIn";

function App() {

  // For Changing Color of Navbar on Scroll
  const [scroll, setScroll] = useState(false);
  window.addEventListener("scroll", () => {
    const scrollCheck = window.scrollY > 20;
    if (scrollCheck !== scroll) {
      setScroll(!scroll);
    }
  });

  return (
      <div className="App" >
        
        <div
          className="NavContainer"
          style={{
            backgroundColor: scroll ? "white" : "transparent",
          }}
        >
          <NavBar />
        </div>

        <div className="Sections">
          <SignIn/>
        </div>
      </div>
  );
}
export default App;
