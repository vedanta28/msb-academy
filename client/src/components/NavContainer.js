import {useState} from "react";
import NavBar from "./NavBar";

function NavContainer() {
  // For Changing Color of Navbar on Scroll
  const [scroll, setScroll] = useState(false);
  window.addEventListener("scroll", () => {
    const scrollCheck = window.scrollY > 20;
    if (scrollCheck !== scroll) {
      setScroll(!scroll);
    }
  });

  return (
    <div
      className="NavContainer"
      style={{
        backgroundColor: scroll ? "white" : "transparent",
        boxShadow: scroll ? "5px 5px 5px 1px rgba(0,0,0,0.1)" : "none "
      }}
    >
      <NavBar />
    </div>
  );
}

export default NavContainer;