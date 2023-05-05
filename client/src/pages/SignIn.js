import { useState } from "react";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

// Importing stylesheets
import "../stylesheets/SignIn.css"

// Importing components
import SignInForm from "../components/SignInForm";
import SignUpForm from "../components/SignUpForm";

function SignIn() {
  const [sign, setSign] = useState("0");

  // Handle change
  const handleChange = (event, newSign) => {
    setSign(newSign);
  };

  return (
    <div className="SignIn">
      <ToggleButtonGroup
        color="primary"
        value={sign}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
        className="ToggleGroup"
      >
        <ToggleButton className="Toggle" value="0">
          Sign In
        </ToggleButton>
        <ToggleButton className="Toggle" value="1">
          Sign Up
        </ToggleButton>
      </ToggleButtonGroup>
      {
        sign === "0" ? (
          <SignInForm className="SignInForm" />
        ) : (
          <SignUpForm className="SignUpForm" />
        )
      }
    </div>
  );
}

export default SignIn;
