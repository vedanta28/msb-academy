import React, { useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";

function App() 
{
// For Changing Color of Navbar on Scroll
  const [scroll, setScroll] = useState(false);
  window.addEventListener("scroll", () => {
    const scrollCheck = window.scrollY > 10;
    if (scrollCheck !== scroll) {
      setScroll(!scroll);
    }
  });

  return (
    <div className="App">

      <div className="NavContainer" style={{ 
        backgroundColor: scroll ? "white" : "transparent"
      }}>
        <NavBar/>
      </div>

      <Home className="Home"/>
    </div>
  );
}

export default App;