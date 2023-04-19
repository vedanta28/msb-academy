import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { UserContextProvider } from "./context/UserContext";
import { CoursesContextProvider } from "./context/CoursesContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <CoursesContextProvider>
        <UserContextProvider>
            <App />
        </UserContextProvider>
    </CoursesContextProvider>
);