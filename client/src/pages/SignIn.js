import "../stylesheets/SignIn.css"
import { useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import SignInForm from "../components/SignInForm";
import SignUpForm from "../components/SignUpForm";

function SignIn() {
  const [sign, setSign] = useState("0");

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
